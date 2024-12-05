import MainCard from "components/MainCard";
import ServiceList  from "./ServiceList";

const Service = () => {
    const services = [{"serviceCode":"S001","serviceName":"커트","servicePrice":20000},{"serviceCode":"S002","serviceName":"파마","servicePrice":100000},{"serviceCode":"S003","serviceName":"염색","servicePrice":70000},{"serviceCode":"S004","serviceName":"영양","servicePrice":50000},{"serviceCode":"S101","serviceName":"파마,염색","servicePrice":150000},{"serviceCode":"S102","serviceName":"파마,영양","servicePrice":130000},{"serviceCode":"S103","serviceName":"염색,영양","servicePrice":100000},{"serviceCode":"S104","serviceName":"파마,염색,영양","servicePrice":180000},{"serviceCode":"ㅎㅎ","serviceName":"ㅎㅎ","servicePrice":10000}];
    
    return <ServiceList services={services} />
}

export default Service;