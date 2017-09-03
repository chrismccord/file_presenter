defmodule FilePresenterWeb.FileChannel do
  use FilePresenterWeb, :channel

  alias FilePresenter.Watcher

  def join("file_watch", _, socket) do
    # :ok = :fs.subscribe(:watcher)
    {:ok, tree} = Watcher.get_tree()
    {:ok, %{tree: tree}, socket}
  end

  def handle_in("get_file", %{"path" => path}, socket) do
    {:ok, content} = Watcher.get_file(path)
    {:reply, {:ok, %{content: content, path: path}}, socket}
  end
end
