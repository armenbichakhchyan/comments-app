import * as React from 'react';
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RootState, AppDispatch} from "../store/store";
import {addComment, editComment, deleteComment, getComments} from "../store/action/actions";
import {onLikedComment} from  '../store/reducer/storeData';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import CommentFormModal from "../Components/CommentFormModal";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import {useForm} from "../hooks/useForm";
import {useExpanded} from '../hooks/useExpanded';
import {cutText} from '../utils/text';
import {Trash2, Pencil} from 'lucide-react';


const Comments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error, likedComments } = useSelector((state: RootState) => state.data);

    const [visibleComments, setVisibleComments] = useState([]);
    const [nextIndex, setNextIndex] = useState(0);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState<null | "delete" | "add" | "edit">(null);
    const [editID, setEditID] = useState<number | null>(null);
    const lastCommentRef = useRef<HTMLLIElement | null>(null);
    const { isExpanded, toggleExpand } = useExpanded();


    const limit = 20;

    const addForm = useForm({
        initialValues: {name: "", email: "", body: ""},

        validate: (values) => {
            const errors: Record<string, string> = {};

            Object.entries(values).forEach(([key, value]) => {
                if (typeof value === "string" && !value.trim()) {
                    errors[key] = `${key} is required`;
                }
            });
            return errors;
        },

        onSubmit: (values) => {
            dispatch(addComment(values));
            setOpenModal(null)
        }
    })

    const editForm = useForm({
        initialValues: {id: 0, name: "", email: "", body: ""},

        validate: (values) => {
            const errors: Record<string, string> = {};

            Object.entries(values).forEach(([key, value]) => {
                if (typeof value === "string" && !value.trim()) {
                    errors[key] = `${key} is required`;
                }
            });
            return errors;
        },


        onSubmit: (values) => {
            dispatch(editComment(values));
            setOpenModal(null)
        }
    })

    const filteredComments = useMemo(() => {
        const query = search.toLowerCase().trim();

        return visibleComments.filter(comment =>
            comment.id.toString().includes(query) ||
            comment.name.toLowerCase().includes(query) ||
            comment.email.toLowerCase().includes(query) ||
            comment.body.toLowerCase().includes(query)
        );
    }, [search, visibleComments]);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    useEffect(() => {
        if (data && data.length > 0) {
            setVisibleComments(data.slice(0, nextIndex || limit));
        }

        if(openModal) {
            document.body.style.overflow = "hidden";
        }else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [data, nextIndex, openModal]);

    const loadMore = () => {
        const newIndex = nextIndex + limit;
        setVisibleComments(data.slice(0, newIndex));
        setNextIndex(newIndex);
        setTimeout(() => {
            lastCommentRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    };

    const isLiked = (id: number) => likedComments.some((c) => c.id === id);

    return (
        <div className="comments">
            <div className="container">
                <div className="comments__top_block">
                    <Input
                        type='text'
                        name='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="comments__search"
                    />

                    <h1 className='comments__main__title'>Comments</h1>

                    <button
                        className="add__comment__btn"
                        onClick={() => setOpenModal("add")}
                    >
                        Add Comment
                    </button>
                </div>

                {loading.dataLoading ?
                        <div className='loader'>Loading Comments...</div>
                    : error ? (
                            <div className='error'>Failed To Fetch</div>
                    ) : search && !filteredComments.length ? (
                            <div>
                                Not Comment Found
                            </div>
                    )
                        : (
                            <ul className="comments-list">
                            {filteredComments.map((comment, index) => (
                                <li
                                    key={comment.id}
                                    className="comment__item"
                                    ref={index === filteredComments.length - 1 ? lastCommentRef : null}
                                >
                                    <div className="comment__item__content">
                                        <span className='comments__id'>{index + 1}</span>

                                        <h3 className='comments__name'><strong className='content__title'>Name: </strong>{comment.name}</h3>

                                        <p className='comments__email'><strong className='content__title'>Email: </strong>{comment.email}</p>

                                        <p
                                            className='comments__body'
                                            onClick={() => toggleExpand(comment.id)}
                                        >
                                            <strong className='content__title'>Body: </strong>
                                            {isExpanded(comment.id) ? comment.body : cutText(comment.body, 120)}
                                        </p>

                                    </div>


                                    <div className="comment__actions">
                                        <button
                                            className='comment__action__btn delete__btn'
                                            onClick={() => {
                                                setEditID(comment.id)
                                                setOpenModal("delete");
                                            }}
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                        <button
                                            className='comment__action__btn edit__btn'
                                            onClick={() => {
                                                setOpenModal("edit");
                                                editForm.setValues(comment)}
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>
                                    </div>

                                    <button
                                        className='comment__action__btn like__btn'
                                        onClick={() => dispatch(onLikedComment(comment))}
                                    >
                                        {isLiked(comment.id)
                                            ? <i className="fa-solid fa-heart" style={{color: "red"}}></i>
                                            : <i className="fa-regular fa-heart" ></i>
                                        }
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )
                }

                {nextIndex < data.length && filteredComments.length > 0 && (
                    <button
                        className="comments__next"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                )}
            </div>

            <ScrollToTopButton />

            {openModal === "add" && (
                <CommentFormModal
                    title='Add Comment'
                    values={addForm.values}
                    errors={addForm.errors}
                    onChange={addForm.handleChange}
                    onSubmit={addForm.handleSubmit}
                    onClose={() => setOpenModal(null)}
                />
            )}

            {openModal === "edit" && (
                <CommentFormModal
                    title={`Add #${editForm.values.id} Comment`}
                    values={editForm.values}
                    errors={editForm.errors}
                    onChange={editForm.handleChange}
                    onSubmit={editForm.handleSubmit}
                    onClose={() => setOpenModal(null)}
                />
            )}

            {openModal === "delete" && (
                <Modal>
                    <div className='comments__delete__modal'>
                        <h2>Are you sure want to delete?</h2>

                        <div className='comments__delete__btns'>
                            <button
                                className='close__modal__btn'
                                onClick={() => setOpenModal(null)}>Close</button>

                            <button
                                className="modal__delete"
                                onClick={() => {
                                    if (editID !== null) dispatch(deleteComment(editID));
                                    setOpenModal(null);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Comments;
