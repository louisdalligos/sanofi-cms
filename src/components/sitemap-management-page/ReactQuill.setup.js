const ReactQuillSetup = {
    modules: function() {
        return {
            toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" }
                ]
                // ['link', 'image', 'video'],
                // ['clean']
            ],
            clipboard: {
                matchVisual: false
            }
        };
    },
    formats: function() {
        return [
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video"
        ];
    }
};

export default ReactQuillSetup;
