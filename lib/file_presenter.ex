defmodule FilePresenter do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec
    
    watch_path = System.get_env("WATCH") ||
      raise(ArgumentError, "WATCH env variable must be set")

    children = [
      supervisor(FilePresenterWeb.Endpoint, []),
      worker(FilePresenter.Watcher, [:watcher, watch_path])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: FilePresenter.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    FilePresenterWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
