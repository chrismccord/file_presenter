defmodule FilePresenter do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    watch_path = System.get_env("WATCH") ||
      raise(ArgumentError, "WATCH env variable must be set")

    children = [
      supervisor(FilePresenterWeb.Endpoint, []),
      worker(FilePresenter.ChatMonitor, [:chat_monitor, []]),
      worker(FilePresenter.Watcher, [:watcher, watch_path])
    ]

    opts = [strategy: :one_for_one, name: FilePresenter.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    FilePresenterWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
