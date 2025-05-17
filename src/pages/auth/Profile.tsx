import React, { useState } from "react";
import { User, Mail, MapPin, Calendar } from "lucide-react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import FormField from "../../components/ui/FormField";
import { useAuth } from "../../contexts/AuthContext";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <PageContainer title="My Profile">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32" />
        <div className="relative px-6">
          <div className="flex items-center">
            <div className="absolute -top-16">
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 text-4xl font-bold">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="ml-32 py-5 flex justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <div className="flex items-center mt-1 text-gray-600">
                  <Mail size={16} className="mr-1" />
                  {user?.email}
                </div>
              </div>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 pb-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField id="name" label="Name">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<User size={18} />}
                  />
                </FormField>

                <FormField id="bio" label="Bio">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm
                      placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Tell us about yourself"
                  />
                </FormField>

                <FormField id="location" label="Location">
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    icon={<MapPin size={18} />}
                    placeholder="City, Country"
                  />
                </FormField>

                <div className="flex space-x-3">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        name: user?.name || "",
                        bio: user?.bio || "",
                        location: user?.location || "",
                      });
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {user?.bio && (
                  <div className="mt-3">
                    <h2 className="text-gray-500 text-sm font-medium">Bio</h2>
                    <p className="mt-1 text-gray-900">{user.bio}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-5">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    {user?.location && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <MapPin size={16} className="mr-1" />
                          Location
                        </dt>
                        <dd className="mt-1 text-gray-900">{user.location}</dd>
                      </div>
                    )}
                    {user?.joinedDate && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <Calendar size={16} className="mr-1" />
                          Joined
                        </dt>
                        <dd className="mt-1 text-gray-900">
                          {formatDate(user.joinedDate)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
