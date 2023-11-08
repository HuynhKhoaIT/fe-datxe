import { BulbOutlined } from '@ant-design/icons';
import routes from '@routes';
import { IconBuildingCommunity, IconClipboardText, IconSchool, IconSettings, IconUserBolt } from '@tabler/icons-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { generatePath } from 'react-router-dom';
import apiConfig from './apiConfig';
import { categoryKind } from './masterData';
const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý admin" />,
        key: 'account-management',
        icon: <IconUserBolt size={16} />,
        children: [],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý Khoá học" />,
        key: 'quan-ly-mon-hoc',
        icon: <IconSchool size={16} />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản lý sinh viên" />,
                key: 'student-management',
                path: routes.studentListPage.path,
                permission: apiConfig.student.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Khoá học" />,
                key: 'khoa-hoc',
                path: generatePath(routes.courseListPage.path, {}),
                permission: apiConfig.course.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Môn học" />,
                key: 'mon-hoc',
                path: generatePath(routes.subjectListPage.path, {}),
                permission: apiConfig.subject.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Yêu cầu khoá học" />,
                key: 'yeu-cau-khoa-hoc',
                path: generatePath(routes.courseRequestListPage.path, {}),
                permission: apiConfig.subject.getList.baseURL,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý dự án" />,
        key: 'quan-ly-du-an',
        icon: <IconClipboardText size={16} />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản lý leader" />,
                key: 'leader-management',
                path: generatePath(routes.leaderListPage.path, {}),
                permission: apiConfig.leader.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Quản lý lập trình viên" />,
                key: 'developer-management',
                path: generatePath(routes.developerListPage.path, {}),
                permission: apiConfig.developer.getList.baseURL,
            },

            {
                label: <FormattedMessage defaultMessage="Dự án" />,
                key: 'project-management',
                path: generatePath(routes.projectListPage.path, {}),
                permission: apiConfig.project.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Quản lý vai trò dự án" />,
                key: 'project-role-management',
                path: generatePath(routes.projectRoleListPage.path, {}),
                permission: apiConfig.projectRole.getList.baseURL,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý công ty" />,
        key: 'quan-ly-cong-ty',
        icon: <IconBuildingCommunity size={16} />,
        permission: apiConfig.company.getList.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản lý công ty" />,
                key: 'company-management',
                path: generatePath(routes.companyListPage.path, {}),
                permission: apiConfig.company.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Quản lý gói dịch vụ" />,
                key: 'service-company-subscription',
                path: generatePath(routes.serviceCompanySubListPage.path, {}),
            },
            {
                label: <FormattedMessage defaultMessage="Quản lý đăng ký gói dịch vụ" />,
                key: 'company-subscription-management',
                path: generatePath(routes.companySubscriptionListPage.path, {}),
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
        key: 'quan-ly-he-thong',
        icon: <IconSettings size={16} />,
        permission: apiConfig.category.getList.baseURL,
        children: [
            {
                label: categoryKind.education.title,
                key: 'education-category',
                path: generatePath(routes.categoryListPageEdu.path, {
                    kind: categoryKind.education.value,
                }),
            },
            {
                label: categoryKind.generation.title,
                key: 'generation-category',
                path: generatePath(routes.categoryListPageGen.path, {
                    kind: categoryKind.generation.value,
                }),
            },
            {
                label: <FormattedMessage defaultMessage="Cài đặt" />,
                key: 'setting',
                path: routes.settingsPage.path,
            },
        ],
    },

    ///////////////////// LEADER MENU /////////////////////////////
    {
        label: <FormattedMessage defaultMessage="Khoá học" />,
        key: 'course-leader',
        icon: <IconSchool size={16} />,
        permission: apiConfig.course.getListLeaderCourse.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Khoá học của tôi" />,
                key: 'my-course-leader',
                path: routes.courseLeaderListPage.path,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Dự án" />,
        key: 'project-leader',
        icon: <BulbOutlined />,
        permission: apiConfig.course.getListLeaderCourse.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Dự án của tôi" />,
                key: 'my-project-leader',
                path: generatePath(routes.projectLeaderListPage.path, {}),
            },
        ],
    },

    ///////////////////// STUDENT MENU /////////////////////////////
    {
        label: <FormattedMessage defaultMessage="Khoá học" />,
        key: 'course-student',
        icon: <IconSchool size={16} />,
        permission: [apiConfig.course.getListStudentCourse.baseURL],
        children: [
            {
                label: <FormattedMessage defaultMessage="Khoá học của tôi" />,
                key: 'my-course-student',
                path: generatePath(routes.courseStudentListPage.path, {}),
            },
            {
                label: <FormattedMessage defaultMessage="Task của tôi" />,
                key: 'my-task-student',
                path: generatePath(routes.myTaskStudentListPage.path, {}),
            },
            {
                label: <FormattedMessage defaultMessage="Hoạt động của tôi" />,
                key: 'my-activity-course-student',
                path: generatePath(routes.myActivityCourseStudentListPage.path, {}),
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Dự án" />,
        key: 'project-student',
        icon: <BulbOutlined />,
        permission: apiConfig.course.getListStudentCourse.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Dự án của tôi" />,
                key: 'my-project-student',
                path: routes.projectStudentListPage.path,
            },
            {
                label: <FormattedMessage defaultMessage="Task của tôi" />,
                key: 'my-task-project-student',
                path: routes.projectStudentMyTaskListPage.path,
            },
            {
                label: <FormattedMessage defaultMessage="Hoạt động của tôi" />,
                key: 'my-activity-project-student',
                path: generatePath(routes.myActivityProjectStudentListPage.path, {}),
            },
        ],
    },
    ///////////////////// COMPANY MENU /////////////////////////////
    {
        label: <FormattedMessage defaultMessage="Quản lý công ty" />,
        key: 'quan-ly-cong-ty-company',
        icon: <IconBuildingCommunity size={16} />,
        permission: apiConfig.companyRequest.getList.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản lý yêu cầu công ty" />,
                key: 'company-request',
                path: generatePath(routes.companyRequestListPage.path, {}),
                permission: apiConfig.companyRequest.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Ứng viên đã lưu" />,
                key: 'company-seek-management',
                path: routes.companySeekListPage.path,
                permission: apiConfig.companySeek.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Quản lý đăng ký gói dịch vụ" />,
                key: 'my-company-subscription-management',
                path: generatePath(routes.myCompanySubscriptionListPage.path, {}),
                permission: apiConfig.serviceCompanySubscription.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Tìm kiếm ứng viên" />,
                key: 'company-seek',
                path: routes.companySeekDevListPage.path,
                permission: apiConfig.companySeek.getListDev.baseURL,
            },
        ],
    },
];

export default navMenuConfig;
