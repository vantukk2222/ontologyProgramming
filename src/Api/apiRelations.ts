import axiosClient from "./AxiosConfig";
const apiRelation = {
    getRelation: () => {
        const url = `/structure/relation-types`;
        return axiosClient.get(url);
        },
    getEligibleRelation: (idCourse: string) => {
        const url = `/courses/${idCourse}/eligible-relations`;
        return axiosClient.get(url);
        },

    addRelation: (idCourse: string, data: any) => {
        // {
        //     "relations": [
        //       {
        //         "relation_type": "ns0__coNoiDung",
        //         "target_id": "4:e5b67c32-e364-4b3c-a5ac-b8ace039b49a:241"
        //       },
        //       {
        //         "relation_type": "rdf_tpye",
        //         "target_id": "4:e5b67c32-e364-4b3c-a5ac-b8ace039b49a:241"
        //       }
        //     ]
        //   }
        const url = `courses/${idCourse}/relations`;
        return axiosClient.post(url, data);
        },
    updateRelation: (idRelation: string, data: any) => {
        // {
        //     "relation_type": "ns0__tienQuyet",
        //     "target_id": "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:51"
        // }
        
        const url = `/courses/relations/${idRelation}`;
        return axiosClient.put(url, data);
    },
    deleteRelation: (idRelation: string) => {
        const url = `/structure/relations/${idRelation}`;
        return axiosClient.delete(url);
    },

};


export default apiRelation;
