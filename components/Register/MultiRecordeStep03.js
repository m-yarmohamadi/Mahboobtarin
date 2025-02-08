import React from "react";

const MultiRecordeStep03 = ({
  recordName,
  recordValue,
  modalName,
  setModalName,
  openModalName,
  setOpenModalName,
}) => {
  return (
    <div>
      <div className="w-full flex justify-between items-end border-b-2 border-primary-01 pb-2">
        <div className="font-bold">
          <span>تخصص</span>
          <span className="text-xs text-error font-normal">(امکان ثبت موارد متعدد)</span>

        </div>
        <div>
          {recordName.length > 2 ? (
            <button
              disabled
              className="bg-primary-02 shadow-md dark:shadow-darkMd p-2 rounded-md text-primary-04 text-xs"
              type=""
            >
              {enToFaNumber("امکان درج بیش از 3 گزینه وجود ندارد")}
            </button>
          ) : (
            <button
              onClick={() => setOpenModalName(!openModalName)}
              className="bg-primary-01 p-2 rounded-md text-white text-xs font-bold"
              type=""
            >
              افزودن
            </button>
          )}
        </div>
        <modalName
          openModalName={openModalName}
          setOpenModalName={setOpenModalName}
          setModalName={setModalName}
          modalName={modalName}
        />
      </div>
      {modalName.map((item, index) => {
        const handleDeleteRecordName = (index) => {
          setModalName((prevRecordName) =>
            prevRecordName.filter((item, i) => i !== index)
          );
        };

        return (
          <div
            key={index}
            className="flex justify-between items-center bg-primary-01 bg-opacity-10 px-4"
          >
            <div>{item.modalName}</div>
            <div className="flex justify-center items-center gap-2 ">
              <span className="flex justify-center items-center pt-2">
                {item.recordValue}
              </span>
              <span
                onClick={() => handleDeleteRecordName(index)}
                className="text-error flex justify-center items-center text-xl"
              >
                <AiTwotoneDelete />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiRecordeStep03;
