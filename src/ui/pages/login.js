import Form from "../components/Form";

const Login = () => {
  return (
    <div>
      <div className="w-full p-4 text-center">
        <h4 className="font-bold text-2xl text-primary">HarvestEase</h4>
      </div>
      <div className="p-8 m-8 mx-auto rounded-xl">
        <h5 className="font-medium mb-6">
          HarvestEase, a platform for farmers
        </h5>
        <Form />
      </div>
    </div>
  );
};

export default Login;
