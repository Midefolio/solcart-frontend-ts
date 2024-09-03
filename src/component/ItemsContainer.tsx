import Items from "./items";

interface ItemsContainerProps {
    title: string;
  }

const ItemsContainer = ({}: ItemsContainerProps) => {
    return ( <>
    <div className="xs-12 my-col-12 bd-bottm-bold bg-wite">
     <div className="my-mother xs-12">
     <div className="xs-5 my-col-5 xs-down-4 interBold px16 xs-px12"><span className="pd-10">Fairly Used Items</span></div>
      <div className="xs-7 right xs-down-4">
        <span className="pd-5 mg-5 px12 bd-bottom-bold-2 my-bottom-10">Free Delievery</span>
        <span className="pd-10 px12 c-pointer mg-5">Promo</span>
        <span className="pd-10 px12 c-pointer mg-5 hidden-xs">Appliances</span>
        <span className="pd-10 px12 c-pointer mg-5 hidden-xs">Phones and Gagets</span>
        <span className="pd-10 px12 c-pointer mg-5 hidden-xs">Fashion</span>
        <span className="pd-10 px12 c-pointer mg-5 hidden-xs">Gaming</span>
        <span className="pd-10 mg-5"><i className="fas fa-exchange"></i></span>
      </div>
     </div>
    </div>
    <div className="my-mother xs-down-8 down-2">
    <Items/>
     <Items/>
     <Items/>
     <Items/>
     <Items/>
    </div>
    </> );
}
 
export default ItemsContainer;