import { Card } from "primereact/card";
import OrderList from "../components/OrderList";
import BasicStats from "../components/BasicStats";
import RevenueChart from "../components/RevenueChart";
import { useEffect, useState } from "react";

function HomePage() {

 return (
   <>
    <section>
      <div className="mt-5">
        <BasicStats />
      </div>
      <div className="mt-4">
        <RevenueChart />
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