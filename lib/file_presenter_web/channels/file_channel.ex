defmodule FilePresenterWeb.FileChannel do
  use FilePresenterWeb, :channel

  alias FilePresenter.Watcher

  def join("file_watch", _, socket) do
    {:ok, tree} = Watcher.get_tree()
    {:ok, %{tree: tree}, socket}
  end

  def handle_in("get_file", %{"path" => path}, socket) do
    {:ok, content} = Watcher.get_file(path)
    push(socket, "get_file", %{content: content, path: path})
    {:noreply, socket}
  end
  
end
