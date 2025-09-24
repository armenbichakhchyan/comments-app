const commentFields = [
    {
        name: "name",
        type: "text",
        id: 'name',
        required: true,
        label: "Name",
        placeholder: 'Enter Name',
    },

    {
        name: "email",
        type: "email",
        id: 'email',
        required: true,
        label: "Email",
        placeholder: 'Enter Your Email',
    },

    {
        id: "body",
        name:"body",
        label: "Body",
        placeholder: "Input our comment",
        required: true,
    }
]
export default commentFields;