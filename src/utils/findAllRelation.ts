const fillAllRelation = (relations: {
    rdfs__label: string;
    relation_id: string;
    relation_type: string;
    target_id: string;
}[], relation_type: string) => {
    return relations.filter(relation => relation.relation_type === relation_type) || null;
};
export default fillAllRelation;