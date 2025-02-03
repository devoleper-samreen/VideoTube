const googleRedirect = (req, res) => {
    const redirectUri = `http://localhost:${process.env.PORT}/auth/google/callback`;

    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

    res.redirect(googleAuthURL);
}

export default googleRedirect