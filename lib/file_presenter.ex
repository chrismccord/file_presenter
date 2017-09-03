defmodule FilePresenter do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec
    watch_path = System.get_env("WATCH") ||
      raise(ArgumentError, "WATCH env variable must be set")

    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      supervisor(FilePresenterWeb.Endpoint, []),
      worker(FilePresenter.Watcher, [:watcher, watch_path])
      # Start your own worker by calling: FilePresenter.Worker.start_link(arg1, arg2, arg3)
      # worker(FilePresenter.Worker, [arg1, arg2, arg3]),
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
