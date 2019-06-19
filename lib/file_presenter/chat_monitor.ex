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

  def delete_message(id) do
    GenServer.call(__MODULE__, {:delete_message, id})
  end

  def get_messages() do
    GenServer.call(__MODULE__, :get_messages)
  end

  def handle_call({:new_message, message}, _form, state) do
    message_w_id = Map.put_new(message, :id, Enum.count(state) + 1)
    new_state = Enum.concat(state, [message_w_id])
    {:reply, message_w_id, new_state}
  end

  def handle_call(:get_messages, _from, state) do
    {:reply, {:ok, state}, state}
  end

  def handle_call({:delete_message, id}, _from, state) do
    new_state = Enum.filter(state, fn message ->
      message.id != id.id
    end)
    IO.inspect(new_state)
    {:reply, state, state}
  end

end
