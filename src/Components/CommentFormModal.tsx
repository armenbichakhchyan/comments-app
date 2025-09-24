import * as React from 'react';
import Modal from "./Modal";
import FormField from "./FormField";
import {X} from 'lucide-react';
import commentFields from "../data/commentFields";

interface Props<T> {
    title: string,
    values: T;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

function CommentFormModal<T>({
    title,
    errors,
    values,
    onChange,
    onSubmit,
    onClose,
}: Props<T>) {
    return (
        <Modal>
            <div className="comments__add__modal">
                <h2>{title}</h2>

                <form onSubmit={onSubmit}>
                    {commentFields.map((field) => (
                        <FormField
                            key={field.id}
                            field={field}
                            value={(values as any) [field.name]}
                            error={errors[field.name]}
                            onChange={onChange}
                        />
                    ))}

                    <button type="submit">
                        Submit
                    </button>
                </form>

                <div className="comments__delete__btns">
                    <button className="close__modal__btn" onClick={onClose}>
                        <X />
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CommentFormModal;