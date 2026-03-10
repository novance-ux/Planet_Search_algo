/** InputFormSection — Section 3: KOI input form with validation, demo button, submit. */
import { useCallback } from "react";
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import InputField from "../ui/InputField";
import DemoSignalButton from "../ui/DemoSignalButton";
import SubmitButton from "../ui/SubmitButton";
import { INPUT_FIELDS } from "../../constants/inputFields";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function InputFormSection({
  values,
  errors,
  isFieldValid,
  isFieldInvalid,
  onFieldChange,
  onLoadDemo,
  onSubmit,
  isLoading,
}) {
  const handleFieldChange = useCallback(
    (key, value) => onFieldChange(key, value),
    [onFieldChange]
  );

  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-8">
      <div>
        <SectionLabel text="MISSION_CONTROL · INPUT_PARAMETERS" />
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold">
          Configure Your Signal Analysis
        </h2>
      </div>

      {/* Terminal-style card */}
      <div className="p-6 md:p-8 rounded-xl border border-[var(--border-glow)] bg-[var(--bg-card)] shadow-[var(--glow-sm)]">
        {/* Input grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {INPUT_FIELDS.map((field) => (
            <motion.div key={field.key} variants={item}>
              <InputField
                field={field}
                value={values[field.key]}
                error={errors[field.key]}
                isValid={isFieldValid(field.key)}
                isInvalid={isFieldInvalid(field.key)}
                onChange={handleFieldChange}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
          <DemoSignalButton onClick={onLoadDemo} />
          <div className="flex-1">
            <SubmitButton isLoading={isLoading} onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
