import { Tag } from "primereact/tag";

function StatusTag({status}) {
  if (status === "PROCESSING") {
    return (
      <>
      <Tag className="p-tag-fade-warning" value={status}></Tag>
      </>
    );
  } else if (status === "COMPLETED") {
    return (
      <>
      <Tag className="p-tag-fade-primary" value={status}></Tag>
      </>
    );
  } else if (status === "CANCELED") {
    return (
      <>
      <Tag className="p-tag-fade-danger" value={status}></Tag>
      </>
    );
  } else {
    return (<></>);
  }
}

export default StatusTag;