import { ProgressSpinner } from "primereact/progressspinner";

function Spinner() {
  return (
  <>
    <div className="d-flex justify-content-center">
      <ProgressSpinner strokeWidth="6" animationDuration=".5s" 
      style={{width: '50px', height: '50px'}}/>
    </div>
  </>
  );
}

export default Spinner;