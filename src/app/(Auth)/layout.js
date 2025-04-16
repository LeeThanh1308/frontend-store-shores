function AuthLayout({ children }) {
  return (
    <div
      style={{
        backgroundImage: "url('/images/bg-register.webp')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
