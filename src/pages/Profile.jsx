import { useState } from 'react';
import { Container, Input, Button } from '../components'; // Assuming you have these components
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin} from '../store/authSlice'

function Profile() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  
  const { register, handleSubmit, formState } = useForm();

  const UpdateProfile = async ({ name, email, newPassword, oldPassword }) => {
      setError("");
      if(!email && !newPassword && !name)
          return;

      if((email || newPassword) && !oldPassword){
        setError("Old Password is required to update Email or password")
        return;
      }
      try {

          // Update Email
          if (email && email !== userData.email) {
              await authService.updateEmail(email, oldPassword);
          }

          // Update Password
          if (newPassword) {
              await authService.resetPassword(newPassword, oldPassword);
          }

          // Update Name
          if (name && name !== userData.name) {
              await authService.updateName(name);
          }

          // Refresh user data after updates
          const updatedUserData = await authService.getCurrentUser();
          if (updatedUserData) {
            dispatch(authLogin(updatedUserData));
          }

      } catch (error) {
          setError(error.message);
      }
  };

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-col md:flex-row bg-color3 text-color2 p-6 rounded-lg shadow-md max-w-4xl mx-auto gap-8'>
          
          <div className='flex-1'>
            <h2 className='text-2xl font-bold mb-4'>Profile</h2>
            
            <div className='mb-2'>
              <p><strong>Name:</strong> {userData.name}</p>
            </div>
            
            <div className='mb-2'>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
            
            <div className='mb-2'>
              <p>
                <strong>Joined On:</strong>{" "}
                {userData?.$createdAt
                  ? new Date(userData.$createdAt).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            
            <div className='mb-2'>
              <p><strong>No of Posts:</strong> N/A</p>
            </div>

          </div>

          {/* Right Side - Edit Form */}
          <div className='flex-1'>
            <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>

            {error && <p className="text-red-700 mt-8 text-center font-semibold">{error}</p>}
            
            <form onSubmit={handleSubmit(UpdateProfile)} className='space-y-4'>
              <Input
              label="New Name: "
              placeholder="Enter your full name"
              className={formState.errors.name ? "border-b-4 border-b-red-600": ""}
              {...register("name", {
                  pattern: {
                      value: /^[A-Za-z\s]{3,30}$/,
                      message: "Name must be 3-30 characters and contain only letters and spaces",
                  }
              })}
              />
              {formState.errors.name && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.name.message}</p>}
              
              <Input
              label="New Email: "
              placeholder="Enter your email"
              className={formState.errors.email ? "border-b-4 border-b-red-600": ""}
              type="email"
              {...register("email", {
                  pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be a valid address"
                  }
              })}
              />
              {formState.errors.email && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.email.message}</p>}

              <Input
              label="Old Password: "
              type="password"
              placeholder="Enter your password"
              className={formState.errors.oldPassword ? "border-b-4 border-b-red-600": ""}
              {...register("oldPassword", {
                  minLength: {
                    value: 8,
                    message: "Password length should be 8 or more"
                  },
                  maxLength: {
                    value: 20,
                    message: "Password length should be 20 or less"
                  }
              })}
              />
              {formState.errors.oldPassword && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.oldPassword.message}</p>}

              <Input
              label="New Password: "
              type="password"
              placeholder="Enter your password"
              className={formState.errors.newPassword ? "border-b-4 border-b-red-600": ""}
              {...register("newPassword", {
                  pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                      message: "8-20 characters, with 1 uppercase, 1 lowercase, and 1 number required"
                  }
              })}
              />
              {formState.errors.newPassword && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.newPassword.message}</p>}

              <Button type="submit" className='w-full' disabled={formState.isSubmitting}>
                {formState.isSubmitting ? 'Updating...' : 'Update'}
              </Button>
            </form>

          </div>
          
        </div>
      </Container>
    </div>
  );
}

export default Profile;
