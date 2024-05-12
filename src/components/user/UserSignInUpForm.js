export function UserSignInUpForm ({
  userState,
  setUserState,
  username,
  email,
  pw,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
}) {
  return (
    <>
      {/* content container display selected section */}
      <table className="USER_Table">
        <tbody>
          <tr>
            <th colSpan={2} className="title">
              <button
                onClick={() => {
                  if (userState !== "Sign Out") setUserState("Sign In");
                }}>
                Sign In
              </button>{" "}
              /{" "}
              <button
                onClick={() => {
                  if (userState !== "Sign Out") setUserState("Sign Up");
                }}>
                Sign Up
              </button>
            </th>
          </tr>
          <tr>
            <th>Username:</th>
            <td>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </td>
          </tr>
          {userState === "Sign In" ? (
            <></>
          ) : (
            <tr>
              <th>Email:</th>
              <td>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
          )}
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="password"
                placeholder="password"
                value={pw}
                onChange={handlePasswordChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
