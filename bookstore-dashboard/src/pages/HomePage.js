import { Card } from "primereact/card";
import OrderList from "../components/OrderList";

function HomePage() {
 return (
   <>
    <section>
      <div className="row mt-5">
        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">All orders</h6>
              <h1 className="m-0">0</h1>
            </div>
          </Card>
        </div>

        <div className="col-lg-3 mb-4">
          <Card>
            <div className="p-4">
              <h6 className="m-0">Total sales</h6>
              <h1 className="m-0">0</h1>
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

      <div className="mt-5">
        <h5>Orders</h5>
        <OrderList />
      </div>

      <div className="pb-2"></div>

    </section>
   </>
 )
}

export default HomePage;