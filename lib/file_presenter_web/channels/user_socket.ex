defmodule FilePresenterWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "file_watch", FilePresenterWeb.FileChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
