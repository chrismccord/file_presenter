defmodule FilePresenterWeb.ChatChannel do
  use FilePresenterWeb, :channel

  def join("chat", _, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", message, socket) do
    broadcast(socket, "new_message", %{message: message})
    {:noreply, socket}
  end

end
