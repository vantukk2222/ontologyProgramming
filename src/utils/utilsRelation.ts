import apiRelation from "../Api/apiRelations";

export const getRelationTypes = async () => {
    try {
        const response = await apiRelation.getRelation();
        return response.data;
    } catch (error) {
        console.error("Error fetching relation types:", error);
        throw error;
    }
};

export const getEligibleRelations = async (idCourse: string) => {
    try {
        const response = await apiRelation.getEligibleRelation(idCourse);
        return response.data;
    } catch (error) {
        console.error("Error fetching eligible relations:", error);
        throw error;
    }
};

export const addRelationToCourse = async (idCourse: string, relationData: {
    relations: {
        relation_type: string;
        target_id: string;
    }[];
}) => {
    try {
        const response = await apiRelation.addRelation(idCourse, relationData);
        return response.data;
    } catch (error) {
        console.error("Error adding relation to course:", error);
        throw error;
    }
};

export const updateRelationByID = async (idRelation: string, relationData: {
    relation_type: string;
    target_id: string;
}) => {
    try {
        const response = await apiRelation.updateRelation(idRelation, relationData);
        return response.data;
    } catch (error) {
        console.error("Error updating relation:", error);
        throw error;
    }
};

export const deleteRelationByID = async (id : string) => {
    try {
        const response = await apiRelation.deleteRelation(id);
        return response.data;
    } catch (error) {
        console.error("Error deleting relation:", error);
        throw error;
    }
}