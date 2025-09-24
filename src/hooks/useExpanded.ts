import { useState } from 'react'

export const useExpanded = () => {
    const [expandedComments, setExpandedComments] = useState<number[]>([]);

    const isExpanded = (id: number) => expandedComments.includes(id);

    const toggleExpand = (id: number) => {
        setExpandedComments(prev =>
            prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
        );
    };

    return {expandedComments, isExpanded, toggleExpand};
};