import Loader from "../Loader/Loader";

const ProxyForLoaders = ({type} : {type: string}) => {
    switch (type) {
        case "big":
            return <div className='loader-container'><Loader /></div>
        case "small":
            return <Loader />
        default:
            return null;
    }
}
 
export default ProxyForLoaders;