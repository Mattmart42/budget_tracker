import { useAuthentication } from "../services/authService"

export function HomePage() {
    const user = useAuthentication()

    return (
      <div className="homepage">
        <h1>Welcome to the homepage! Let's get started.</h1>
      </div>
    )
}