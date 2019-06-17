defmodule FilePresenter.ChatMonitor do
  use GenServer

  @impl true
  def init(messages) do
    {:ok, messages}
  end

  def start_link(_fs_name, _watch_path) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def push_message(message) do
    GenServer.call(__MODULE__, {:new_message, message})
  end

  def get_messages() do
    GenServer.call(__MODULE__, :get_messages)
  end

  def handle_call({:new_message, message}, _form, state) do
    new_state = Enum.concat(state, [message])
    {:reply, message, new_state}
  end

  def handle_call(:get_messages, _from, state) do
    {:reply, {:ok, state}, state}
  end

end
