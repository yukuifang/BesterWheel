/**
 * Created by fangyukui on 2018/3/11.
 */
export default  class  DataRepository{
    fetchNetRepository(url){
        return new Promise((resovle,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resovle(result)
                })
                .catch(error=>{
                    reject(error)
                })

        })

    }
}