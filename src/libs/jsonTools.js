/**
 * JSON 객체 내부에 프로퍼티가 하나도 존재하지 않는지 판별하는 함수.
 * 
 * @param {*} obj 
 * @returns {boolean} - 프로퍼티가 하나도 없으면 true, 있으면 false
 */
const isEmptyObject = (obj) => {
    
    // JSON 객체 내 프로퍼티의 key의 개수를 가지고 빈 객체 여부 판단.
    // key의 개수가 0개면 빈 객체로 인정. 
    return Object.keys(obj).length === 0;
}

export {
    isEmptyObject,
};