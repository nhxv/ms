import { Card } from "primereact/card";

function HomePage() {
 return (
   <>
    <section>
      <div className="row mt-5">
        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">Pending orders</h6>
              <h1 className="m-0">0</h1>
            </div>
          </Card>
        </div>

        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">Total book sales</h6>
              <h1 className="m-0">$0</h1>
            </div>
          </Card>
        </div>

        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">Revenue</h6>
              <h1 className="m-0">$0</h1>
            </div>
          </Card>
        </div>

        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">Customers</h6>
              <h1 className="m-0">0</h1>
            </div>
          </Card>
        </div>
      </div>

    </section>
   </>
 )
}

export default HomePage;