defmodule FilePresenter.Watcher do
  use GenServer

   @patterns [
     ~r{components/.*$},
     ~r{assets/.*$},
     ~r{lib/.*$},
     ~r{.babelrc$},
     ~r{index.html$},
     ~r{package.json$},
     ~r{README.md$},
     ~r{webpack.config.js$}
    ]

  def get_tree() do
    GenServer.call(__MODULE__, :tree)
  end

  def get_file(rel_path) do
    GenServer.call(__MODULE__, {:get_file, rel_path})
  end

  def start_link(fs_name, watch_path) do
    GenServer.start_link(__MODULE__, [fs_name, watch_path], name: __MODULE__)
  end

  def init([fs_name, watch_path]) do
    {:ok, _pid} = :fs.start_link(fs_name, watch_path)
    :ok = :fs.subscribe(fs_name)
    {:ok, %{fs_name: fs_name, watch_path: watch_path, tree: get_tree(watch_path)}}
  end

  def handle_call({:get_file, rel_path}, _form, %{watch_path: watch_path} = state) do
    safe_rel_path =
      rel_path
      |> String.replace("../", "")
      |> String.replace("./", "")
      |> String.replace("\\", "")
      |> String.replace(":/", "")

    full_path = Path.join(watch_path, safe_rel_path)
    {:reply, {:ok, safe_read(full_path)}, state}
  end

  def handle_call(:tree, _form, state) do
    {:reply, {:ok, get_relative_tree(state)}, state}
  end

  def handle_info(:update_tree, state) do
    relative_tree = get_relative_tree(state)
    FilePresenterWeb.Endpoint.broadcast("file_watch", "update_tree", %{tree: relative_tree})
    {:noreply, state}
  end

  def handle_info({_pid, {:fs, :file_event}, {path, _event}}, state) do
    if matches_any_pattern?(path, @patterns) do
      asset_type = path |> Path.extname() |> String.trim_leading(".")
      relative_path = Path.relative_to(path, state.watch_path)
      IO.inspect "Update: #{relative_path}"
      tree = get_tree(state.watch_path)
      Process.send_after(self(), :update_tree, 100)
      FilePresenterWeb.Endpoint.broadcast("file_watch", "update_file", %{
        type: asset_type,
        content: safe_read(path),
        path: to_string(relative_path)
      })
      {:noreply, %{state | tree: tree}}
    else
      {:noreply, state}
    end
  end

  defp get_relative_tree(%{watch_path: watch_path} = state) do
    state.tree
    |> Stream.filter(fn path -> not File.dir?(path) end)
    |> Enum.map(&Path.relative_to(&1, watch_path))
  end
  defp safe_read(path) do
    case File.read(to_string(path)) do
      {:ok, content} -> content
      {:error, _reason} -> ""
    end
  end

  defp get_tree(watch_path) do
    patterns = [
      "components/**/*",
      "lib/**/*",
      "assets/js/**/*",
      "assets/css/**/*",
      ".babelrc",
      "webpack.config.js",
      "README.md"
    ]
    Enum.flat_map(patterns, fn pattern ->
      Path.wildcard(Path.expand(Path.join(watch_path, pattern)), match_dot: false)
    end)
  end

  defp matches_any_pattern?(path, patterns) do
    path = to_string(path)

    not(String.starts_with?(Path.basename(path), ".")) and Enum.any?(patterns, fn pattern ->
      String.match?(path, pattern) and !String.match?(path, ~r/_build/)
    end)
  end
end
