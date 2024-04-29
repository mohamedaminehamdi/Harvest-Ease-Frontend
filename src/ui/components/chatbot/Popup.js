const Popup = ({ children, onClose,content }) => {
    return (

        <div className="bg-lightGreen w-12 h-6 rounded-full text-center shadow-sm fixed top-5 right-9">
            {content}
        </div>
    )
}
  export default Popup;