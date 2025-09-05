import {
  Card,
  Avatar,
  Button,
  Chip,
  Divider,
  Input,
  Textarea,
  Tooltip,
} from '@heroui/react';
import {
  Mail,
  Phone,
  Instagram,
  MessageCircle,
  Send,
  Facebook,
  Award,
  Briefcase,
  GraduationCap,
  Bookmark,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { userQueries } from '@/entities/user';
import { useEditMentorProfile } from '@/entities/user/user.queries';
import Select from 'react-select';
import { ImageCropModal } from '@/shared/ui/profile/ImageCropModal';

export const MentorProfilePage = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const {
    data: skillsData,
    isLoading: isSkillsLoading,
    isError: isSkillsError,
  } = userQueries.useGetSkills();

  const user = userData?.data;
  const editMentorProfile = useEditMentorProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const [skills, setSkills] = useState<string[]>([]);
  const [achievements, setAchievements] = useState('');
  const [socials, setSocials] = useState({
    instagram: '',
    telegram: '',
    whatsapp: '',
    facebook: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workExperience, setWorkExperience] = useState([]);
  const [educations, setEducations] = useState([]);
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  useEffect(() => {
    if (user && !isEditMode) {
      const skillIds = user.skills?.map((s) => s.id) || [];
      setSkills(skillIds);

      setAchievements(user.mentorAchievements || '');

      setSocials({
        instagram: user.instagram || '',
        telegram: user.telegram || '',
        whatsapp: user.whatsapp || '',
        facebook: user.facebook || '',
      });

      setPhoneNumber(user.phoneNumber || '');
      setWorkExperience(user.workExperiences || []);
      setEducations(user.educations || []);

      setPreviewImage(null);
      setPhotoFile(null);
    }
  }, [user, isEditMode]);

  const renderFieldOrPlaceholder = (
    value: any,
    placeholder = 'Пока не заполнено'
  ) =>
    value ? value : <span className="text-gray-400 italic">{placeholder}</span>;

  const handleWorkChange = (idx, key, value) => {
    const updated = [...workExperience];
    updated[idx][key] = value;
    setWorkExperience(updated);
  };

  const handleAddWork = () => {
    setWorkExperience([
      ...workExperience,
      {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemoveWork = (idx) => {
    const updated = [...workExperience];
    updated.splice(idx, 1);
    setWorkExperience(updated);
  };

  const handleEducationChange = (idx, key, value) => {
    const updated = [...educations];
    updated[idx][key] = value;
    setEducations(updated);
  };

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        institution: '',
        fieldOfStudy: '',
        date: '',
        description: '',
      },
    ]);
  };

  const handleRemoveEducation = (idx) => {
    const updated = [...educations];
    updated.splice(idx, 1);
    setEducations(updated);
  };

  const handleSaveChanges = () => {
    if (!user) return;

    const formattedWork = workExperience.map((exp) => ({
      position: exp.position,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    }));

    const formattedEducation = educations.map((e) => ({
      institution: e.institution,
      fieldOfStudy: e.fieldOfStudy,
      date: e.date,
      description: e.description,
    }));

    const payload: MentorProfileForm = {
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber,
      photo: photoFile, // ⬅️ вот здесь
      skills: skills.map((s) => Number(s)).filter(Boolean),
      mentorAchievements: achievements,
      instagram: socials.instagram,
      telegram: socials.telegram,
      whatsapp: socials.whatsapp,
      facebook: socials.facebook,
      educations: formattedEducation,
      workExperiences: formattedWork,
    };

    editMentorProfile.mutate(payload, {
      onSuccess: () => setIsEditMode(false),
    });
  };

  if (isLoading) return <div className="p-6 text-center">Загрузка...</div>;
  if (isError || !user)
    return (
      <div className="p-6 text-center text-red-500">
        Ошибка загрузки профиля
      </div>
    );

  const skillOptions =
    skillsData?.data?.map((skill) => ({
      value: skill.id,
      label: skill.name,
    })) || [];

  const selectedSkills = skillOptions.filter((option) =>
    skills.includes(option.value)
  );
  

  return (
    <div className=" mx-auto p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Профиль преподавателя</h1>
        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center gap-2"
        >
          <Pencil size={18} />
          {isEditMode ? 'Отменить' : 'Редактировать'}
        </Button>
      </div>
      <Card className="w-full flex flex-col md:flex-row gap-8 md:justify-between  rounded-lg shadow-none border-none">
        <div className="flex flex-col items-center md:items-start md:w-1/3 gap-4">
          <div className="relative group flex flex-col items-center">
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (isEditingPhoto) {
                  document.getElementById('avatar-file-input')?.click();
                }
              }}
            >
              <Avatar
                src={previewImage || user.photo}
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-full border-4 border-indigo-500 w-32 h-32"
              />

              {isEditingPhoto && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <Pencil size={24} className="text-white" />
                </div>
              )}
            </div>
            {!isEditingPhoto && (
              <Tooltip content="Изменить фото профиля" placement="bottom">
                <button
                  className="absolute bottom-0 right-3 bg-white border-3 border-indigo-500 rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                  onClick={() => setIsEditingPhoto(true)}
                >
                  <Pencil size={20} className="text-gray-600" />
                </button>
              </Tooltip>
            )}
            {isEditingPhoto && (
              <Button
                size="sm"
                className="mt-2"
                onClick={() => setIsEditingPhoto(false)}
              >
                Отменить
              </Button>
            )}

            <input
              id="avatar-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCropFile(file);
                  setShowCropModal(true);
                }
              }}
              className="hidden"
            />

            {showCropModal && cropFile && (
              <ImageCropModal
                file={cropFile}
                onClose={() => {
                  setShowCropModal(false);
                  setIsEditingPhoto(false);
                }}
                onCropDone={(imageDataUrl, croppedFile) => {
                  setPreviewImage(imageDataUrl);
                  setPhotoFile(croppedFile);
                  setIsEditingPhoto(false);
                }}
              />
            )}
          </div>

          <h2 className="text-xl font-semibold text-center md:text-left">
            {renderFieldOrPlaceholder(user.firstName)} <br />
            {renderFieldOrPlaceholder(user.lastName)}
          </h2>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={18} />
            {renderFieldOrPlaceholder(user.email, 'Email не указан')}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} />
            {isEditMode ? (
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Введите номер"
              />
            ) : (
              renderFieldOrPlaceholder(phoneNumber, 'Телефон не указан')
            )}
          </div>

          <p className="mt-4 font-semibold text-gray-700">Социальные сети</p>
          {isEditMode ? (
            <div className="flex flex-col gap-2 w-full">
              {Object.entries(socials).map(([key, value]) => (
                <Input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) =>
                    setSocials({ ...socials, [key]: e.target.value })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 mt-1 flex-wrap">
              {Object.entries(socials).map(([key, value]) =>
                value ? (
                  <Button
                    as="a"
                    key={key}
                    href={value}
                    target="_blank"
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    {
                      {
                        instagram: (
                          <Instagram size={20} className="text-pink-600" />
                        ),
                        whatsapp: (
                          <MessageCircle size={20} className="text-green-600" />
                        ),
                        telegram: <Send size={20} className="text-blue-500" />,
                        facebook: (
                          <Facebook size={20} className="text-blue-700" />
                        ),
                      }[key]
                    }
                  </Button>
                ) : null
              )}
              {!Object.values(socials).some(Boolean) && (
                <span className="text-gray-400 italic">Пока не заполнено</span>
              )}
            </div>
          )}
        </div>

        <Divider orientation="vertical" className="hidden md:block" />
        <div className="min-w-[60%] space-y-8">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-700 mb-3">
              <Bookmark size={24} /> Навыки
            </h3>
            {isEditMode ? (
              <Select
                isMulti
                options={skillOptions}
                value={selectedSkills}
                onChange={(selected) =>
                  setSkills(selected.map((opt) => opt.value))
                }
                placeholder="Выберите навыки..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.skills?.length ? (
                  user.skills.map((skill) => (
                    <Chip
                      key={skill.id}
                      color="primary"
                      radius="sm"
                      className="capitalize"
                    >
                      {skill.name}
                    </Chip>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    Пока не заполнено
                  </span>
                )}
              </div>
            )}
          </section>
          {/* <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-3">
              <Award size={24} /> Достижения
            </h3>
            {isEditMode ? (
              <Textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder="Опишите ваши достижения"
              />
            ) : (
              <p className="text-gray-700">
                {renderFieldOrPlaceholder(user.mentorAchievements)}
              </p>
            )}
          </section> */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700 mb-3">
              <Briefcase size={24} /> Опыт работы
            </h3>
            {isEditMode ? (
              <div className="space-y-6">
                {workExperience.map((work, idx) => (
                  <div key={idx} className="border p-4 rounded-md relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 z-20 bg-white border border-danger-500 p-1 rounded-full right-0 text-red-500"
                      onClick={() => handleRemoveWork(idx)}
                    >
                      <X size={18} />
                 
                    </Button>
                    <Input
                      placeholder="Должность"
                      value={work.position}
                      onChange={(e) =>
                        handleWorkChange(idx, 'position', e.target.value)
                      }
                    />
                    <Input
                      placeholder="Компания"
                      className="mt-2"
                      value={work.company}
                      onChange={(e) =>
                        handleWorkChange(idx, 'company', e.target.value)
                      }
                    />
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="date"
                        value={work.startDate}
                        onChange={(e) =>
                          handleWorkChange(idx, 'startDate', e.target.value)
                        }
                      />
                      <Input
                        type="date"
                        value={work.endDate}
                        onChange={(e) =>
                          handleWorkChange(idx, 'endDate', e.target.value)
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Описание"
                      className="mt-2"
                      value={work.description}
                      onChange={(e) =>
                        handleWorkChange(idx, 'description', e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  onClick={handleAddWork}
                  className="flex items-center gap-2"
                >
                  <Plus size={18} />
                  Добавить опыт
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {workExperience.length ? (
                  workExperience.map((work, idx) => (
                    <li key={idx} className="border-l-4 border-purple-500 pl-4">
                      <p className="font-semibold">{work.position}</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {renderFieldOrPlaceholder(work.company)}
                      </a>
                      <p className="text-sm text-gray-600">
                        {renderFieldOrPlaceholder(work.startDate)} —{' '}
                        {renderFieldOrPlaceholder(work.endDate)}
                      </p>
                      <p className="text-gray-700">
                        {renderFieldOrPlaceholder(work.description)}
                      </p>
                    </li>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    Пока не заполнено
                  </span>
                )}
              </ul>
            )}
          </section>
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 mb-3">
              <GraduationCap size={24} /> Образование
            </h3>
            {isEditMode ? (
              <div className="space-y-6">
                {educations.map((edu, idx) => (
                  <div key={edu.id} className="border p-4 rounded-md relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 z-20 bg-white border border-danger-500 p-1 rounded-full right-0 text-red-500"
                      onClick={() => handleRemoveEducation(idx)}
                    >
                      <X size={18} />
                    </Button>
                    <Input
                      placeholder="Учебное заведение"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          idx,
                          'institution',
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Направление"
                      className="mt-2"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          idx,
                          'fieldOfStudy',
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Дата"
                      className="mt-2"
                      value={edu.date}
                      onChange={(e) =>
                        handleEducationChange(idx, 'date', e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Описание"
                      className="mt-2"
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          idx,
                          'description',
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <Button
                  onClick={handleAddEducation}
                  className="flex items-center gap-2"
                >
                  <Plus size={18} />
                  Добавить образование
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {educations.length ? (
                  educations.map((edu) => (
                    <li
                      key={edu.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <p className="font-semibold">
                        {renderFieldOrPlaceholder(edu.institution)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {renderFieldOrPlaceholder(edu.fieldOfStudy)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {renderFieldOrPlaceholder(edu.date)}
                      </p>
                      <p className="text-gray-700">
                        {renderFieldOrPlaceholder(edu.description)}
                      </p>
                    </li>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    Пока не заполнено
                  </span>
                )}
              </ul>
            )}
          </section>

          {isEditMode && (
            <Button
              className="mt-4 bg-blue-500 text-white"
              onClick={handleSaveChanges}
              disabled={editMentorProfile.isPending}
            >
              {editMentorProfile.isPending
                ? 'Сохранение...'
                : 'Сохранить изменения'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
