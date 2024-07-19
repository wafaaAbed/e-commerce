import LottieHandler from "@Components/feedback/LottieHandler/LottieHandler";
import { Row ,Col} from "react-bootstrap";

type TGridListPrors<T>={
  records:T[],
  renderItem:(record:T)=>React.ReactNode;
  emptyMessage:string;

}

type HadId ={id?:number}
function GridList<T extends HadId>({records,renderItem,emptyMessage}:TGridListPrors<T>) {
  const categoryList=records.length>0 ? records.map((record,index) =>
    <Col key={index} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
       {renderItem(record)}
          </Col>
  ):<LottieHandler type="empty" message={emptyMessage}/> ;
    
  
  return (
    <Row>
    
      {categoryList}
    </Row>
  )
}

export default GridList
