import toast from "react-hot-toast";
import { useUpadateProfile } from "../../features/auth/useUpadateProfile";
import Header from "../../ui/Header";
import AccountForm from "../../ui/AccountForm";

function UpdateAccount() {
  const { updateProfile, isUpdating } = useUpadateProfile();

  function handleFormSubmit({
    fullName,
    avatar,
    email,
    verifyPass,
    password,
    birthDate,
    phone,
    bgImg,
    details,
  }) {
    if (password === verifyPass) {
      let data = {
        data: { password, email, phone },
        additionalData: { fullName, details, birthDate },
        avatar,
        bgImg,
      };
      updateProfile(data);
    } else {
      toast.error("verfiy pass and pass not matched");
    }
  }
  return (
    <div className="px-5">
      <Header header="update profile" />
      <AccountForm
        onSubmit={handleFormSubmit}
        isSubmiting={isUpdating}
        submitBtnText="Update Booking"
      />
    </div>
  );
}

UpdateAccount.propTypes = {};

export default UpdateAccount;
