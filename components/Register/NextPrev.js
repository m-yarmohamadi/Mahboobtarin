import Loading from "@/tools/Loading";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const NextPrev = ({ prevStep, loading, step, isStep4 }) => {
  return (
    <div
      className={`py-8 flex  items-center ${
        step === 1 || isStep4 ? `justify-end` : `justify-between`
      }`}
    >
      {!isStep4 && (
        <button
          onClick={prevStep}
          type="submit"
          className={`btn btn--outline gap-2 !text-base ${
            step === 1 && ` hidden `
          }`}
        >
          <span>
            <FaArrowRight className="w-5 h-5" />
          </span>

          <span>مرحله قبل</span>
        </button>
      )}
      <button
        type="submit"
        className={`btn btn--primary gap-2 !text-base ${
          loading && `aria-disabled`
        } disabled:bg-primary-02`}
      >
        {!loading ? (
          <>
            {step === 4 ? <span>ثبت نهایی</span> : <span>مرحله بعد</span>}

            <span>
              <FaArrowLeft className="w-5 h-5" />
            </span>
          </>
        ) : (
          <Loading />
        )}
      </button>
    </div>
  );
};

export default NextPrev;
