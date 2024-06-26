import React from 'react';

const ViewSlides = ({ slidesUrl }) => {
    const isPDF = slidesUrl.endsWith('.pdf');

    return (
        <div className='view-slides'>
            <h1>Viewing Slides</h1>
            {isPDF ? (
                <embed src={slidesUrl} type='application/pdf' width='100%' height='500px' />
            ) : (
                <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(slidesUrl)}`} width='100%' height='500px' frameBorder='0'>
                    This browser does not support viewing PowerPoint files. Please download the file to view it.
                </iframe>
            )}
        </div>
    );
};

export default ViewSlides;
