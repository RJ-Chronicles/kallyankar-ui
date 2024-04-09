import LoginForm from "../components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <section className="h-screen mx-0 md:mx-auto">
      <div className="h-full">
        <div className="g-6 flex  h-full flex-wrap items-center justify-center ">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden md:block">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 shadow-md bg-gray-50 py-4 flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold text-slate-700 text-center font-sans ">
              Kallyankar Batteries
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
