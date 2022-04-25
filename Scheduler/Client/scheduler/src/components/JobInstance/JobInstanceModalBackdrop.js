import React from "react";
import {motion} from "framer-motion"

export const JobInstanceModalBackdrop = ({children, onClick}) => {
    //for form modal
    //requires some css
    //wrap the modal in this backdrop

    return (
        <motion.div
            className="jobInstanceBackdrop"
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}

            
        </motion.div>
    )
}