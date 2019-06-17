defmodule FilePresenterWeb.ChatChannel do
  use FilePresenterWeb, :channel
  alias FilePresenter.ChatMonitor

  def join("chat", _, socket) do
    {:ok, messages} = ChatMonitor.get_messages()
    {:ok, %{messages: messages} ,socket}
  end

  def handle_in("new_message", message, socket) do
    broadcast(socket, "new_message", %{message: message})
    ChatMonitor.push_message(message)
    {:noreply, socket}
  end

end
