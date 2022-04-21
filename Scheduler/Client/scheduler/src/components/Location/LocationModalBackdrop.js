import React from "react";
import {motion} from "framer-motion"

export const LocationModalBackdrop = ({children, onClick}) => {
    //for form modal
    //requires some css
    //wrap the modal in this backdrop

    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}

            
        </motion.div>
    )
}