import '../App.css';

function LoggedOutPage() {
  return (
    <div className="logged-out-page d-flex justify-content-center">
      <div className="logged-out">
        <h1 className="text-center mb-5">You are not logged in. </h1>
        <h1 className="text-center mb-5">
          Please log in to continue using NomTrackr.
        </h1>
      </div>
    </div>
  );
}
export default LoggedOutPage;
