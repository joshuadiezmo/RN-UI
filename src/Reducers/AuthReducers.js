var _ = require('lodash');

import {USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,
        USER_LOGOUT,
        DEVICE_ACCESS_ADDED,
        DEVICE_ACCESS_MODIFIED,
        UPDATE_PROFILE,
        ADD_FRIEND,
        MODIFIED_FRIEND,
        ADDED_FRIEND_PROFILE,
        UPDATE_STATUS_FRIEND,
        CHANGE_FRIEND_NAME,
        ADD_GROUP,
        MODIFIED_GROUP,
        DELETE_GROUP,


        ADDED_GROUP_PROFILE,
        MODIFIED_GROUP_PROFILE,
        REMOVED_GROUP_PROFILE,


        MODIFIED_GROUP_PROFILE_NAME,

        UPDATE_GROUP_PICTURE_PROFILE,
        FAVORITES_GROUP,
        MEMBER_JOIN_GROUP,
        CANCELED_GROUP_MEMBER,
        MEMBER_DECLINE_GROUP,
        MEMBER_INVITE_AGAIN_GROUP,
        MEMBER_LEAVE_GROUP,
        ADDED_GROUP_MEMBER,
        MODIFIED_GROUP_MEMBER,
        REMOVED_GROUP_MEMBER,
        // ADDED_GROUP_ADMIN,
        MODIFIED_GROUP_ADMIN, 
        REMOVED_GROUP_ADMIN,
        ADDED_CLASS,
        MODIFIED_CLASS,
        REMOVED_CLASS,
        // CLASS_MEMBERS,
        ADDED_CLASS_MEMBER,
        MODIFIED_CLASS_MEMBER,
        REMOVED_CLASS_MEMBER,
        FAVORITES_CLASS,
        UPDATE_CLASS_PICTURE_PROFILE,
        FRIEND_MUTE,
        FRIEND_HIDE,
        FRIEND_BLOCK,
        FRIEND_FAVORITE,
        ADDED_MY_APPLICATION,
        MODIFIED_MY_APPLICATION,
        REMOVED_MY_APPLICATION,
        UPDATE_STATUS_MY_APPLICATION,
        ADD_APPLICATION_CATEGORY,

        ADDED_MY_APPLICATIONS_POSTS,
        ADDED_MY_APPLICATIONS_POSTS_IMAGES,
        ADDED_MY_APPLICATIONS_POSTS_LIKES,
        MODIFIED_MY_APPLICATIONS_POSTS_LIKES,
        REMOVED_MY_APPLICATIONS_POSTS_LIKES,

        UPDATE_PICTURE_PROFILE,
        UPDATE_PICTURE_BG_PROFILE,
        EDIT_DISPLAY_NAME_PROFILE,
        EDIT_STATUS_MESSAGE_PROFILE,
        // EDIT_MY_ID_PROFILE,
        GENDER_PROFILE,
        INTERESTE_IN_PROFILE,
        BIRTHDAY_PROFILE,

        ADD_PHONE_PROFILE,
        EDIT_PHONE_PROFILE,
        REMOVE_PHONE_PROFILE,

        ADD_PHONE_FRIEND,
        EDIT_PHONE_FRIEND,
        REMOVE_PHONE_FRIEND,

        ADD_WEBSITE_FRIEND,
        EDIT_WEBSITE_FRIEND,
        REMOVE_WEBSITE_FRIEND,

        ADD_EMAIL_FRIEND,
        EDIT_EMAIL_FRIEND,
        REMOVE_EMAIL_FRIEND,

        ADD_MY_ID_FRIEND, 
        EDIT_MY_ID_FRIEND, 
        REMOVE_MY_ID_FRIEND,

        ADDRESS_PROFILE,

        ADD_WEBSITE_PROFILE,
        EDIT_WEBSITE_PROFILE,
        REMOVE_WEBSITE_PROFILE,
    
        ADD_EMAIL_PROFILE,
        EDIT_EMAIL_PROFILE,
        REMOVE_EMAIL_PROFILE,
        
    
        ADD_MY_ID_PROFILE,
        EDIT_MY_ID_PROFILE,
        REMOVE_MY_ID_PROFILE,
    
    
        ADDED_FEELINGS_AND_PRIVACY}  from '../Actions/types'

const INITIAL_STATE = {users:null,
                       user:null,
                       provider:'',
                       isLogin: false,
                       online: '-1',
                       error_message:'',
                       application_category: null
                       }

import {isEquivalent2Object} from '../Utils/Helpers'

import Constant from '../Utils/Constant'

export default (state= INITIAL_STATE, action)=>{
    console.log(action)
    // return INITIAL_STATE
    switch(action.type){
        case USER_LOGIN_SUCCESS: {
            state = {...state, 
                    // user: action.user, 
                    provider: action.provider,
                    isLogin : true,
                    users   : action.users,
                    user    : action.user,
                    online  : '1',
                    }
            return state
        } 
        case USER_LOGIN_FAIL: {
            return {...state,
                    provider: action.provider,
                    isLogin: false}
        }

        case USER_LOGOUT: {
            return INITIAL_STATE
        }

        case 'persist/REHYDRATE':{
            if(!action.hasOwnProperty('payload')){
                return INITIAL_STATE
            }

            if(action.payload === undefined){
                return INITIAL_STATE
            }

            if(!action.payload.hasOwnProperty('auth')){
                return INITIAL_STATE
            }

            state = {...state, 
                    // user : action.payload.auth.user,
                    users   : action.payload.auth.users,
                    user    : action.payload.auth.user,
                    isLogin : action.payload.auth.isLogin,
                    provider: action.payload.auth.provider,
                    online  : action.payload.auth.online,
                    application_category: action.payload.auth.application_category,
                    post_feelings:  action.payload.auth.post_feelings,
                    post_privacys:  action.payload.auth.post_privacys}

            console.log(state, action)
            return state
        }

        case DEVICE_ACCESS_ADDED:
        case DEVICE_ACCESS_MODIFIED:{
            if(state.users === null){
                return state
            }

            let device_access = state.users.device_access
            // console.log(device_access)

            let key = 0
            let value = null
            _.each(device_access, function(_v, _k) { 
                if(_v.udid === action.data.udid){
                    key = _k
                    value = _v
                }
            });

            if(key == 0){
                // console.log("#0")
                // มีเครื่องใหม่ เข้าใช้งานระบบ

                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        device_access : {
                            ...state.users.device_access,
                            [action.id]:action.data
                        }
                    }
                }
                // console.log(v)
                return v
            }else{
                if(!isEquivalent2Object(value, action.data)){
                    // console.log(key)
                    // console.log(value)
                    // console.log(action.device)

                    // let _t = {...device_access, [key]:action.device}
                    // console.log(_t)

                    // console.log(state)

                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            device_access : {
                                ...state.users.device_access,
                                [key]:action.data
                            }
                        }
                    }
                    // console.log(v)
                    return v
                }
            }

            return state
        }

        case UPDATE_PROFILE:{
            if(state.user === null){
                return state
            }

            let profile = state.user.profile;

            if(!_.isEqual(profile, action.profile_data)){
                let newState = {...state,
                                    user : {
                                        ...state.user,
                                        profile: action.profile_data
                                    }
                                }
                // console.log('trackProfiles', newState)
                return newState
            }
            return state
        }

        case UPDATE_PICTURE_PROFILE:{
            if(state.user === null){
                return state
            }

            let profile = state.user.profile;

            if(profile === undefined){
                return state
            }

            if(profile.image_url != action.image_url){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        profile: {
                                            ...state.user.profile,
                                            image_url:action.image_url
                                        }
                                    }
                                }
                return newState
            }
            return state
        }

        case UPDATE_PICTURE_BG_PROFILE:{
            if(state.user === null){
                return state
            }

            let profile = state.user.profile;
            if(profile === undefined){
                return state
            }

            if(profile.bg_url != action.bg_url){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        profile: {
                                            ...state.user.profile,
                                            bg_url:action.bg_url
                                        }
                                    }
                                }
                return newState
            }
            return state
        }

        case EDIT_DISPLAY_NAME_PROFILE:{
            if(state.user === null){
                return state
            }

            let profile = state.user.profile
            if(profile === undefined){
                return state
            }

            let name = state.user.profile.name
            if(name != action.profile_name){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        profile: {
                                            ...state.user.profile,
                                            name:action.profile_name
                                        }
                                    }
                                }
                return newState
            }
            return state
        }

        case EDIT_STATUS_MESSAGE_PROFILE:{
            if(state.users === null){
                return state
            }

            let v = {
                ...state,
                users : {
                    ...state.users,
                    profiles : {
                        ...state.users.profiles,
                        status_message:action.status_message
                    }
                }
            }

            return v
        }

        // case EDIT_MY_ID_PROFILE: {
        //     if(state.users === null){
        //         return state
        //     }

        //     let v = {
        //         ...state,
        //         users : {
        //             ...state.users,
        //             profiles : {
        //                 ...state.users.profiles,
        //                 my_id:action.my_id
        //             }
        //         }
        //     }
        //     return v
        // }

        case GENDER_PROFILE: {
            if(state.user === null){
                return state
            }

            let profile = state.user.profile
            if(profile === undefined){
                return state
            }

            if(profile.gender != action.gender_id){
                let v = {...state,
                    user: {
                        ...state.user,
                        profile: {
                            ...state.user.profile,
                            gender:action.gender_id
                        }
                    }
                }
                console.log('GENDER_PROFILE', profile.gender, action.gender_id)
                return v
            }
            return state
        }

        case BIRTHDAY_PROFILE: {
            if(state.user === null){
                return state
            }

            let profile = state.user.profile
            if(profile === undefined){
                return state
            }

            if(profile.birthday != action.birthday){
                let v = {...state,
                            user: {
                                ...state.user,
                                profile: {
                                    ...state.user.profile,
                                    birthday:action.birthday
                                }
                            }
                        }
                return v
            }
            return state
        }

        // INTERESTE_IN_PROFILE
        case INTERESTE_IN_PROFILE :{
            if(state.user === null){
                return state
            }

            let intereste_in = state.user.profile.intereste_in

            if(intereste_in === undefined){
                return state
            }

            // console.log(intereste_in)
            // console.log(action.intereste_in)
            let v = {...state,
                        user: {
                            ...state.user,
                            profile: {
                                ...state.user.profile,
                                // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                                intereste_in: action.intereste_in
                            }
                        }
                    }

            // console.log(v)
            return v
        }

        case ADD_PHONE_PROFILE:{
            if(state.user === null){
                return state
            }
            let phones = state.user.phones
            if(phones === undefined){
                console.log('ADD_PHONE_PROFILE')
                // let newPhone =  {phone_number: action.phone_number, is_verify:action.is_verify}
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        phones : {
                            ...state.user.phones,
                            // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                            // phones : {
                                [action.phone_key]:action.phone_data
                            // }
                        }
                    }
                }
                return newState
            }

            let phone = _.find(phones,  function(v, k) { 
                return k == action.phone_key
            })

            let newPhone =  action.phone_data//{phone_number: action.phone_number, is_verify:action.is_verify}
            if(phone === undefined){
                console.log('ADD_PHONE_PROFILE', phone, newPhone, phones)
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        // profiles : {
                            // ...state.users.profiles,
                            // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                            phones : {
                                ...state.user.phones,
                                [action.phone_key]:newPhone
                            }
                        // }
                    }
                }
                return newState
            }else{

                if(!_.isEqual(phone, newPhone)){
                    console.log('ADD_PHONE_PROFILE', phone, newPhone, phones)
                    let newState = {
                        ...state,
                        user : {
                            ...state.user,
                            // profiles : {
                                // ...state.users.profiles,
                                // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                                phones : {
                                    ...state.user.phones,
                                    [action.phone_key]:newPhone
                                }
                            // }
                        }
                    }
                    return newState
                } 
            }

            return state
        }

        case EDIT_PHONE_PROFILE:{
            if(state.user === null){
                return state
            }

            let phones = state.user.phones
            if(phones === undefined){
                return state
            }

            let phone = _.find(phones,  function(v, k) { 
                return k == action.phone_key
            })

            if(!_.isEqual(phone, action.phone_data)){
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        // profiles : {
                            // ...state.users.profiles,
                            // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                            phones : {
                                ...state.user.phones,
                                [action.phone_key]:action.phone_data
                            }
                        // }
                    }
                }
                console.log('EDIT_PHONE_PROFILE', action.phone_data, newState)
                return newState
            }
            return state
        }

        case REMOVE_PHONE_PROFILE:{
            if(state.user === null){
                return state
            }

            let phones = state.user.phones
            if(phones === undefined){
                return state
            }

            let phone = _.find(phones,  function(v, k) { 
                return k == action.phone_key
            })

            if(phone === undefined){
                return state
            }

            let newPhones = _.omit(phones, action.phone_key)

            let newState = {
                ...state,
                user : {
                    ...state.user,
                    // profiles : {
                        // ...state.users.profiles,
                        phones: newPhones
                    // }
                }
            }

            return newState
        }

        case ADD_WEBSITE_PROFILE:{
            if(state.user === null){
                return state
            }

            let websites = state.user.websites
            if(websites === undefined){
                // let newWebsite =  
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        // websites : {
                        //     ...state.user.websites,
                        //     // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                        //     // phones : {
                        //         [action.website_key]:newWebsite
                        //     // }
                        // }

                        websites : {
                            ...state.user.websites,
                            [action.website_key]:{url: action.url}
                        }
                    }
                }
                console.log('ADD_WEBSITE_PROFILE', newState, websites)
                return newState
            }

            let website =   _.find(websites,  function(v, k) { 
                                return k == action.website_key
                            })

            let newWebsite = {url: action.url}
            if(website === undefined){
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        // profiles : {
                            // ...state.users.profiles,
                            // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                            websites : {
                                ...state.user.websites,
                                [action.website_key]:newWebsite
                            }
                        // }
                    }
                }
                console.log('ADD_WEBSITE_PROFILE', website, newWebsite, newState)
                return newState
            }else{
                if(!_.isEqual(website, newWebsite)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            // profiles : {
                                                // ...state.users.profiles,
                                                websites: {
                                                    ...state.user.websites,
                                                    [action.website_key]:newWebsite
                                                }
                                            // }
                                        }
                                    }
                    console.log('ADD_WEBSITE_PROFILE', website, newWebsite, newState)
                    return newState
                } 
            }
            return state
        }

        case EDIT_WEBSITE_PROFILE:{
            if(state.user === null){
                return state
            }

            let websites = state.user.websites
            if(websites === undefined){
                return state
            }

            let website =   _.find(websites,  function(v, k) { 
                                return k == action.website_key
                            })

            if(website === undefined){
                return state
            }

            let newWebsite = {url: action.url}
            if(!_.isEqual(website, newWebsite)){
                // let newWebsites = {...websites, [action.website_key]:{url: action.url}}
                let newState = {
                    ...state,
                    user : {
                        ...state.user,
                        // profiles : {
                            // ...state.users.profiles,
                            // ...{intereste_in:{[randomKey()]:{id: action.interestein_id, enable: true}}}
                            websites : {
                                ...state.user.websites,
                                [action.website_key]:newWebsite
                            }
                        // }
                    }
                }

                console.log('EDIT_WEBSITE_PROFILE', website, newWebsite, newState)
                return newState
            }
            return state
        }

        case REMOVE_WEBSITE_PROFILE:{
            if(state.user === null){
                return state
            }
            
            let websites = state.user.websites
            if(websites === undefined){
                return state
            }

            let website =   _.find(websites,  function(v, k) { 
                return k == action.website_key
            })
            
            if(website === undefined){
                return state
            }

            let newWebsites = _.omit(websites, action.website_key)

            let v = {
                ...state,
                user : {
                    ...state.user,
                    // profiles : {
                        // ...state.users.profiles,
                        websites: newWebsites
                    // }
                }
            }
            return v
        }

        /*
        ADD_EMAIL_PROFILE,
        EDIT_EMAIL_PROFILE,
        REMOVE_EMAIL_PROFILE,
        */
        case ADD_EMAIL_PROFILE:{
            if(state.user === null){
                return state
            }

            let emails = state.user.emails
            if(emails === undefined){
                let newEmail =  action.email_data
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        emails: {
                                            [action.email_key]:newEmail
                                        }
                                    }
                                }
                console.log('ADD_EMAIL_PROFILE', newEmail, newState)
                return newState
            }

            let email = _.find(emails,  function(v, k) { 
                            return k == action.email_key
                        })

            let newEmail =  action.email_data
            if(email === undefined){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        emails: {
                                            ...state.user.emails,
                                            [action.email_key]:newEmail
                                        }
                                    }
                                }
                console.log('ADD_EMAIL_PROFILE', newEmail, newState)
                return newState
            }else{
                if(!_.isEqual(email, newEmail)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            emails: {
                                                ...state.user.emails,
                                                [action.email_key]:newEmail
                                            }
                                        }
                                    }
                    console.log('ADD_EMAIL_PROFILE', email, newEmail, newState)
                    return newState
                } 
            }
        }

        case EDIT_EMAIL_PROFILE:{
            if(state.user === null){
                return state
            }

            let emails = state.user.emails
            if(emails === undefined){
                return state
            }
    
            let email = _.find(emails,  function(v, k) { 
                            return k == action.email_key
                        })

            if(email === undefined){
                return state
            }

            let newEmail = action.email_data
            if(!_.isEqual(email, newEmail)){
                // let newWebsites = {...websites, [action.website_key]:{url: action.url}}
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        // profiles: {
                                        //     ...state.users.profiles,
                                            emails: {
                                                ...state.user.emails,
                                                [action.email_key]:newEmail
                                            }
                                        // }
                                    }
                                }

                console.log('EDIT_EMAIL_PROFILE', email, newEmail, newState)
                return newState
            }
            return state
        }

        case REMOVE_EMAIL_PROFILE:{
            if(state.user === null){
                return state
            }

            let emails = state.user.emails
            if(emails === undefined){
                return state
            }

            let email = _.find(emails,  function(v, k) { 
                return k == action.email_key
            })

            if(email !== undefined){
                let newEmails = _.omit(emails, action.email_key)
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        // profiles : {
                                        //     ...state.users.profiles,
                                            emails: newEmails
                                        // }
                                    }
                                }
                return newState
            }
            return state
        }

        case ADD_PHONE_FRIEND :{
            if(state.user === null){
                return state
            }

            let friend_phones = state.user.friend_phones
            let friend_phone  = _.find(friend_phones,  function(v, k) { 
                                    return k == action.friend_id
                                })

            console.log('phones > added', friend_phone )
            if(friend_phone === undefined){
                let fphones = {[action.friend_phone_id]:action.friend_phone_data}

                let v = {...state,
                            user: {
                                ...state.user,
                                friend_phones: {
                                    ...state.user.friend_phones,
                                    [action.friend_id]:fphones
                                }
                            }
                        }
                console.log('phones > added', v )
                return v
            }else{
                let find_phone =_.find(friend_phone, (fv, fk)=>{
                                    return fk == action.friend_phone_id
                                })
                
                let fphones = {...friend_phone, [action.friend_phone_id]:action.friend_phone_data}
                if(find_phone === undefined){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friend_phones: {
                                                ...state.user.friend_phones,
                                                [action.friend_id]:fphones
                                            }
                                        }
                                    }

                    console.log('phones > added', newState )
                    return newState
                }else{
                    if(!_.isEqual(find_phone, action.friend_phone_data)){
                        let newState = {...state,
                                            user: {
                                                ...state.user,
                                                friend_phones: {
                                                    ...state.user.friend_phones,
                                                    [action.friend_id]:fphones
                                                }
                                            }
                                        }

                        console.log('phones > added', newState )
                        return newState
                    } 
                }
            }

            return state
        }

        case EDIT_PHONE_FRIEND:{
            if(state.users === null){
                return state
            }

            return state
        }

        case REMOVE_PHONE_FRIEND:{
            if(state.users === null){
                return state
            }

            return state
        }

        // ADD_WEBSITE_FRIEND,
        // EDIT_WEBSITE_FRIEND,
        // REMOVE_WEBSITE_FRIEND,
        case ADD_WEBSITE_FRIEND:{
            if(state.user === null){
                return state
            }

            let friend_websites = state.user.friend_websites
            let friend_website  = _.find(friend_websites,  function(v, k) { 
                                    return k == action.friend_id
                                })

            if(friend_website === undefined){
                let fwebsites = {[action.friend_website_id]:action.friend_website_data}

                let v = {...state,
                            user: {
                                ...state.user,
                                friend_websites: {
                                    ...state.user.friend_websites,
                                    [action.friend_id]:fwebsites
                                }
                            }
                        }
                return v
            }else{
                let find_website =_.find(friend_website, (fv, fk)=>{
                                    return fk == action.friend_website_id
                                })
                
                let fwebsites = {...friend_website, [action.friend_website_id]:action.friend_website_data}
                if(find_website === undefined){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friend_websites: {
                                                ...state.user.friend_websites,
                                                [action.friend_id]:fwebsites
                                            }
                                        }
                                    }
                    return newState
                }else{
                    if(!_.isEqual(find_website, action.friend_website_data)){
                        let newState = {...state,
                                            user: {
                                                ...state.user,
                                                friend_websites: {
                                                    ...state.user.friend_websites,
                                                    [action.friend_id]:fwebsites
                                                }
                                            }
                                        }
                        return newState
                    } 
                }
            }
            return state
        }

        case EDIT_WEBSITE_FRIEND:{
            if(state.users === null){
                return state
            }

            return state
        }

        case REMOVE_WEBSITE_FRIEND:{
            if(state.users === null){
                return state
            }

            return state
        }


        // ADD_EMAIL_FRIEND,
        // EDIT_EMAIL_FRIEND,
        // REMOVE_EMAIL_FRIEND,

        // emails
        case ADD_EMAIL_FRIEND:{
            if(state.user === null){
                return state
            }

            // email
            let friend_emails = state.user.friend_emails
            let friend_email  = _.find(friend_emails,  function(v, k) { 
                                    return k == action.friend_id
                                })

            if(friend_email === undefined){
                let femails = {[action.friend_email_id]:action.friend_email_data}

                let v = {...state,
                            user: {
                                ...state.user,
                                friend_emails: {
                                    ...state.user.friend_emails,
                                    [action.friend_id]:femails
                                }
                            }
                        }
                return v
            }else{
                let find_email =_.find(friend_email, (fv, fk)=>{
                                    return fk == action.friend_email_id
                                })
                
                let femails = {...friend_email, [action.friend_email_id]:action.friend_email_data}
                if(find_email === undefined){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friend_emails: {
                                                ...state.user.friend_emails,
                                                [action.friend_id]:femails
                                            }
                                        }
                                    }
                    return newState
                }else{
                    if(!_.isEqual(find_email, action.friend_email_data)){
                        let newState = {...state,
                                            user: {
                                                ...state.user,
                                                friend_emails: {
                                                    ...state.user.friend_emails,
                                                    [action.friend_id]:femails
                                                }
                                            }
                                        }
                        return newState
                    } 
                }
            }

            return state
        }

        case EDIT_EMAIL_FRIEND:{
            if(state.user === null){
                return state
            }

            return state
        }

        case REMOVE_EMAIL_FRIEND:{
            if(state.user === null){
                return state
            }

            return state
        }

        // ADD_MY_ID_FRIEND, 
        // EDIT_MY_ID_FRIEND, 
        // REMOVE_MY_ID_FRIEND
        case ADD_MY_ID_FRIEND:{
            if(state.user === null){
                return state
            }

            // my_id
            let friend_my_ids = state.user.friend_my_ids
            let friend_my_id  = _.find(friend_my_ids,  function(v, k) { 
                                    return k == action.friend_id
                                })

            if(friend_my_id === undefined){
                let fmy_ids = {[action.friend_my_id_id]:action.friend_my_id_data}

                let v = {...state,
                            user: {
                                ...state.user,
                                friend_my_ids: {
                                    ...state.user.friend_my_ids,
                                    [action.friend_id]:fmy_ids
                                }
                            }
                        }
                return v
            }else{
                let find_friend_my_id = _.find(friend_my_id, (fv, fk)=>{
                                            return fk == action.friend_my_id_id
                                        })
                
                let fmy_ids = {...friend_my_id, [action.friend_my_id_id]:action.friend_my_id_data}
                if(find_friend_my_id === undefined){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friend_my_ids: {
                                                ...state.user.friend_my_ids,
                                                [action.friend_id]:fmy_ids
                                            }
                                        }
                                    }
                    return newState
                }else{
                    if(!_.isEqual(find_friend_my_id, action.friend_my_id_data)){
                        let newState = {...state,
                                            user: {
                                                ...state.user,
                                                friend_my_ids: {
                                                    ...state.user.friend_my_ids,
                                                    [action.friend_id]:fmy_ids
                                                }
                                            }
                                        }
                        return newState
                    } 
                }
            }

            return state
        }

        case EDIT_MY_ID_FRIEND:{
            if(state.user === null){
                return state
            }

            return state
        }

        case REMOVE_MY_ID_FRIEND:{
            if(state.user === null){
                return state
            }

            return state
        }


        case ADDRESS_PROFILE : {
            if(state.user === null){
                return state
            }

            let profile = state.user.profile

            if(profile === undefined){
                return state
            }

            if(profile.address != action.address){
                let newState = {...state,
                                    users: {
                                        ...state.user,
                                        profile: {
                                            ...state.user.profile,
                                            address:action.address
                                        }
                                    }
                                }

                return newState
            }
            return state
        }

        case ADD_MY_ID_PROFILE:{
            if(state.user === null){
                return state
            }

            let my_ids = state.user.my_ids
            let my_id = _.find(my_ids,  function(v, k) { 
                return k == action.my_id_key // && _.isEqual(v, action.my_id_data)
            })

            // console.log(my_id)
            if(my_id === undefined){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        // profiles: {
                                            // ...state.users.profiles,
                                            my_ids: {
                                                ...state.user.my_ids,
                                                [action.my_id_key]:action.my_id_data
                                            }
                                        // }
                                    }
                                }
                // console.log(v)
                console.log('ADD_MY_ID_PROFILE', action.my_id_data, newState)
                return newState
            }else{
                if(!_.isEqual(my_id, action.my_id_data)){
                    let newState = {...state,
                        user: {
                            ...state.user,
                            // profiles: {
                                // ...state.users.profiles,
                                my_ids: {
                                    ...state.user.profiles.my_ids,
                                    [action.my_id_key]:action.my_id_data
                                }
                            // }
                        }
                    }
                    console.log('ADD_MY_ID_PROFILE', action.my_id_data, newState)
                    return newState
                }
            }
            return state
        }

        case EDIT_MY_ID_PROFILE:{
            if(state.user === null){
                return state
            }

            let my_ids = state.user.my_ids
            if(my_ids === undefined){
                return state
            }

            let my_id = _.find(my_ids,  function(v, k) { 
                return k == action.my_id_key
            })

            if(my_id === undefined){
                if(action.my_id_key == 0){
                    // reset all enable = false
                    _.each(my_ids, (v,k)=>{
                        my_ids = {...my_ids, [k]:{...v, enable:false}}
                    })
                    
                    let newState = {...state,
                                        user: { ...state.user,
                                            my_ids
                                        }
                                    }
                    console.log('EDIT_MY_ID_PROFILE', newState)
                    return newState
                }
                return state
            }

            // let newMy_id =  action.my_id_data
            // // if(!_.isEqual(my_id, newMy_id)){
            //     let newState = {...state,
            //                         user: {
            //                             ...state.user,
            //                                 my_ids: {
            //                                     ...state.user.my_ids,
            //                                     [action.my_id_key]:action.my_id_data
            //                                 }
            //                         }
            //                     }

            //     console.log('EDIT_MY_ID_PROFILE', newState, newMy_id)
            //     return newState
            // // }

            if(action.my_id_data.enable){
                // เช็ดว่า equal กันหรือเปล่าเพราะเราจะไม่ update ซํ้า
                let f = _.find(my_ids, (fv, fk)=>{
                            return fk == action.my_id_key
                        })
                if(_.isEqual(f, action.my_id_data)){
                    return state 
                }

                _.each(my_ids, (v,k)=>{

                    if(k == action.my_id_key){
                        my_ids = {...my_ids, [k]:{...v, enable:true}}
                    }else{
                        my_ids = {...my_ids, [k]:{...v, enable:false}}
                    }
                })

                let newState = {...state,
                                    user: { ...state.user,
                                        my_ids
                                    }
                                }

                // console.log('EDIT_MY_ID_PROFILE', my_ids)
                return newState
            }

            return state
        }

        case REMOVE_MY_ID_PROFILE:{
            if(state.user === null){
                return state
            }

            let my_ids = {...state.user.my_ids}
 
            let my_id = _.find(my_ids,  function(v, k) { 
                return k == action.my_id_key
            })

            if(my_id !== undefined){
                let newMyIDs = _.omit(my_ids, action.my_id_key)
                let newState = {...state,
                                    user : {
                                        ...state.user,
                                        // profiles : {
                                            // ...state.users.profiles,
                                            my_ids: newMyIDs
                                        // }
                                    }
                                }

                return newState
            }

            return state
        }

        case ADD_FRIEND:{
            if(state.user === null){
                return state
            }

            let friends = state.user.friends
            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend === undefined){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        friends : {
                                            ...state.user.friends,
                                            [action.friend_id]:action.friend_data
                                        }
                                    }
                                }
                                
                console.log('ADD_FRIEND', newState)
                return newState;
            }else{

                let newFriend = {...friend, ...action.friend_data}
                if(!_.isEqual(friend, newFriend)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friends : {
                                                ...state.user.friends,
                                                [action.friend_id]:newFriend
                                            }
                                        }
                                    }

                    console.log('ADD_FRIEND', newFriend, friend, newState)
                    return newState;
                }
            }

            return state            
        }

        case MODIFIED_FRIEND:{
            if(state.user === null){
                return state
            }

            let friends = state.user.friends
            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend === undefined){
                return state
            }

            if(!_.isEqual(friend, action.friend_data)){
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        friends: {
                            ...state.user.friends,
                            [action.friend_id]:action.friend_data
                        }
                    }
                }
                // console.log('MODIFIED_FRIEND', v, action)
                return v;
            }
            return state;
        }

        case ADDED_FRIEND_PROFILE:{
            if(state.user === null){
                return state
            }

            let friend_profiles = state.user.friend_profiles
            let friend_profile = _.find(friend_profiles,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend_profile === undefined){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        friend_profiles : {
                                            ...state.user.friend_profiles,
                                            [action.friend_id]:action.friend_profile
                                        }
                                    }
                                }
                
                console.log('ADDED_FRIEND_PROFILE', action.friend_profile, newState)
                return newState;
            }else{
                if(!_.isEqual(friend_profile, action.friend_profile)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            friend_profiles : {
                                                ...state.user.friend_profiles,
                                                [action.friend_id]:action.friend_profile
                                            }
                                        }
                                    }

                    console.log('ADDED_FRIEND_PROFILE', friend_profile, action.friend_profile, newState)
                    return newState;
                }
            }

            return state
        }

        /*
        case DEVICE_ACCESS_MODIFIED:{
            let device_access = state.users.device_access
            // console.log(device_access)

            let key = 0
            let value = null
            _.each(device_access, function(_v, _k) { 
                if(_v.udid === DeviceInfo.getUniqueID()){
                    key = _k
                    value = _v
                }
            });

            console.log(value)
            console.log(action.device)
            if (isEquivalent2Object(value, action.device)) {
                console.log(true)
            }else{
                console.log(false)
            }

            // console.log(deepDiffer(value, action.device))

            return state
        }
        */

        case UPDATE_STATUS_FRIEND:{

            if(state.users === null){
                return state
            }

            let friends = state.users.friends

            let key = 0
            let value = null
            _.each(friends, function(_v, _k) { 
                if(_k === action.id){
                    key = _k
                    value = _v
                }
            });

            console.log(key, ' | ', value)
            
            return state
        }
        
        case CHANGE_FRIEND_NAME:{
            if(state.user === null){
                return state
            }

            let friends = state.user.friends
            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend === undefined){
                return state
            }

            if(friend.change_friend_name === undefined){
                friend = {...friend, change_friend_name:action.change_friend_name}

                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        friends: {
                            ...state.user.friends,
                            [action.friend_id]: friend
                        }
                    }
                }
                console.log('CHANGE_FRIEND_NAME', friend, v)
                return v
            }else{
                if(friend.change_friend_name !== action.change_friend_name){
                    friend = {...friend, change_friend_name:action.change_friend_name}

                    let v = {
                        ...state,
                        user: {
                            ...state.user,
                            friends: {
                                ...state.user.friends,
                                [action.friend_id]: friend
                            }
                        }
                    }

                    console.log('CHANGE_FRIEND_NAME', friend, v)
                    return v
                }
            }

            return state
        }

        case ADD_GROUP:{
            if(state.user === null){
                return state
            }

            let groups = state.user.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        groups: {
                            ...state.user.groups,
                            [action.group_id]: action.group_data
                        }
                    }
                }
                return v
            }else{
                let newGroup = {...group, ...action.group_data}
                if(!_.isEqual(group, newGroup)){
                    // console.log('ADD_GROUP')
                    let v = {...state,
                                user: {
                                    ...state.user,
                                    groups: {
                                        ...state.user.groups,
                                        [action.group_id]: newGroup
                                    }
                                }
                            }
                    // console.log(v)
                    return v
                }
            }
            return state
        }

        case MODIFIED_GROUP:{
            if(state.user === null){
                return state
            }

            let groups = state.user.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }
    
            let newGroup = action.data
            if(group.members !== undefined){
                newGroup = {...newGroup, members:group.members}
            }

            if(group.group_profile !== undefined){
                newGroup = {...newGroup, group_profile:group.group_profile}
            }

            if(!_.isEqual(group, newGroup)){
                // console.log('Not equal')
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        groups: {
                            ...state.user.groups,
                            [action.group_id]: {...group, ...action.data}
                        }
                    }
                }
                // console.log(v)
                // console.log(newGroup)
                return v
            }else{
                // console.log('Equal')
            }

            return state
        }

        case DELETE_GROUP:{
            if(state.user === null){
                return state
            }

            let groups = state.user.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group !== undefined){
                // เป็น การลบ object ที่มี key ตรงกันออก
                // https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object

                let newGroups = _.omit(groups, action.group_id)

                let v = {...state,
                            user: {
                                ...state.user,
                                groups:newGroups
                            }
                        }
                return v
            }
            return state
        }


        // ADDED_GROUP_PROFILE,
        // MODIFIED_GROUP_PROFILE,
        // DELETE_GROUP_PROFILE,

        case ADDED_GROUP_PROFILE:{
            if(state.user === null){
                return state
            }

            let group_profiles = state.user.group_profiles
            let group_profile = _.find(group_profiles, (v, k)=>{
                                    return k == action.group_id
                                })

            if(!group_profile){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        group_profiles : {
                                            ...state.user.group_profiles,
                                            [action.group_id]:action.group_profile_data
                                        }
                                    }
                                }
                
                console.log('ADDED_GROUP_PROFILE', action.group_profile_data, newState)
                return newState;
            }else{
                if(!_.isEqual(group_profile, action.group_profile)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            group_profiles : {
                                                ...state.user.group_profiles,
                                                [action.group_id]:action.group_profile_data
                                            }
                                        }
                                    }

                    console.log('ADDED_GROUP_PROFILE', friend_profile, action.group_profile_data, newState)
                    return newState;
                }
            }

            return state
        }

        case MODIFIED_GROUP_PROFILE:{
            if(state.user === null){
                return state
            }
            
            let group_profiles = state.user.group_profiles
            let group_profile = _.find(group_profiles, (v, k)=>{
                                    return k == action.group_id
                                })

            if(!group_profile){
                if(!_.isEqual(group_profile, action.group_profile_data)){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            group_profiles : {
                                                ...state.user.group_profiles,
                                                [action.group_id]:action.group_profile_data
                                            }
                                        }
                                    }

                    console.log('ADDED_GROUP_PROFILE', friend_profile, action.group_profile_data, newState)
                    return newState;
                }
            }
            return state
        }

        case REMOVED_GROUP_PROFILE:{
            if(state.user === null){
                return state
            }
            
            let group_profiles= state.user.group_profiles
            let group_profile = _.find(group_profiles, (v, k)=>{
                                    return k == action.group_id
                                })

            if(!group_profile){
                let new_group_profiles = _.omit(group_profiles, action.group_id)

                let newState = {...state,
                                    users : {
                                        ...state.users,
                                        group_profiles: new_group_profiles
                                    }
                                }
                return newState
            }

            return state
        }

        case MODIFIED_GROUP_PROFILE_NAME:{

            if(state.user === null){
                return state
            }

            let groups = state.user.groups

            let key = 0
            let value = null
            _.each(groups, function(_v, _k) { 
                if(_k === action.group_id){
                    key = _k
                    value = _v
                }
            });

            let newValue = {...value, 
                                group_profile: {
                                    ...value.group_profile,
                                    image_url:action.image_url
                                }
                            }

            let v = {
                ...state,
                users : {
                    ...state.users,
                    groups : {
                        ...state.users.groups,
                        [action.group_id]: newValue
                    }
                }
            }

            // console.log(v)
            return v
        }

        case UPDATE_GROUP_PICTURE_PROFILE:{

            if(state.users === null){
                return state
            }

            let groups = state.users.groups

            let key = 0
            let value = null
            _.each(groups, function(_v, _k) { 
                if(_k === action.group_id){
                    key = _k
                    value = _v
                }
            });

            let newValue = {...value, 
                                group_profile: {
                                    ...value.group_profile,
                                    image_url:action.image_url
                                }
                            }

            let v = {
                ...state,
                users : {
                    ...state.users,
                    groups : {
                        ...state.users.groups,
                        [action.group_id]: newValue
                    }
                }
            }

            // console.log(v)
            return v
        }

        case FAVORITES_GROUP:{

            if(state.users === null){
                return state
            }

            let groups = state.users.groups

            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }

            if(group.is_favorites === undefined){
                group = {...group, is_favorites:true}
                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        groups : {
                            ...state.users.groups,
                            [action.group_id]: group
                        }
                    }
                }
                return v 
            }else{
                if(action.favorite_status != group.is_favorites){
                    group = {...group, is_favorites:action.favorite_status}
                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            groups : {
                                ...state.users.groups,
                                [action.group_id]: group
                            }
                        }
                    }
                    return v    
                }
            }

            return state
        }

        case MEMBER_JOIN_GROUP:{
            if(state.users === null){
                return state
            }

            let groups = state.users.groups

            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }

            if(group.members !== undefined){
                let member_key = action.member_key

                let member = _.find(group.members,  function(v, k) { 
                    return k == member_key && v.status != Constant.GROUP_STATUS_MEMBER_JOINED
                })

                if(member !== undefined){      
                    let newGroup = {...group, 
                                        members: {
                                            ...group.members,
                                            [member_key]:{...member, status:Constant.GROUP_STATUS_MEMBER_JOINED}
                                        }
                                    }

                    let v = {
                            ...state,
                            users : {
                                ...state.users,
                                groups : {
                                    ...state.users.groups,
                                    [action.group_id]: newGroup
                                }
                            }
                        }

                    return v
                }
            }
            
            return state
        }

        case CANCELED_GROUP_MEMBER:{

            if(state.users === null){
                return state
            }

            let groups = state.users.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }

            let members = group.members
            if(members !== undefined){
                // console.log(action, group)
                let member_key = action.member_key
                let member = _.find(members,  function(v, k) { 
                    return k == member_key
                })

                if(member !== undefined){
                    let newMembers = {...members, [member_key]:{...member, status: Constant.GROUP_STATUS_MEMBER_CANCELED}}
                    let newGroup = {...group, members: newMembers}
                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            groups : {
                                ...state.users.groups,
                                [action.group_id]: newGroup
                            }
                        }
                    }

                    // console.log(v)

                    return v
                }
                // if(member !== undefined){      
                //     let newMembers = _.omit(members, member_key)
                //     let newGroup = {...group, members: newMembers}

                //     let v = {
                //         ...state,
                //         users : {
                //             ...state.users,
                //             groups : {
                //                 ...state.users.groups,
                //                 [action.group_id]: newGroup
                //             }
                //         }
                //     }

                //     console.log(newGroup)
                //     // return v 
                // }
            }

            return state
        }

        case MEMBER_LEAVE_GROUP:{
            if(state.users === null){
                return state
            }

            let groups = state.users.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group !== undefined){ 
                let newGroup = _.omit(groups, action.group_id)
                let newState = {...state,
                    users : {
                        ...state.users,
                        groups : newGroup
                    }
                }
                return newState
            }
            return state
        }

        case MEMBER_DECLINE_GROUP:{

            if(state.users === null){
                return state
            }

            let groups = state.users.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state 
            }

            let members = group.members
            if(members !== undefined){
                // console.log(action, group)
                let member_key = action.member_key
                let member = _.find(members,  function(v, k) { 
                    return k == member_key
                })

                if(member !== undefined){
                    let newMembers = {...members, [member_key]:{...member, status: Constant.MEMBER_DECLINE_GROUP}}
                    let newGroup = {...group, members: newMembers}
                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            groups : {
                                ...state.users.groups,
                                [action.group_id]: newGroup
                            }
                        }
                    }
                    return v
                }
            }
            return state
        }

        case MEMBER_INVITE_AGAIN_GROUP:{
            if(state.users === null){
                return state
            }

            // friend_id, group_id, item_id, status:Constant.GROUP_STATUS_MEMBER_INVITED
            let groups = state.users.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group !== undefined){ 
                return state
            }

            // console.log(group)
            if(group.members !== undefined){ 
                let member = _.find(group.members,  function(v, k) { 
                    return k == action.member_key
                })

                let newGroup = {...group, 
                                    members: {
                                        ...group.members,
                                        [action.member_key]:{...member, status:Constant.GROUP_STATUS_MEMBER_INVITED}
                                    }
                                }

                let v = {...state,
                            users : {
                                ...state.users,
                                groups : {
                                    ...state.users.groups,
                                    [action.group_id]: newGroup
                                }
                            }
                        }
                return v   
            }
            return state
        }

        case ADDED_GROUP_MEMBER:{
            if(!state.user){
                return state
            }

            let group_members = state.user.group_members
            let group_member  = _.find(group_members,  function(v, k) { 
                                    return k == action.group_id
                                })

            if(!group_member){
                let newGroupMembers = {[action.member_key]:action.member_data}
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        group_members: {
                                            ...state.user.group_members,
                                            [action.group_id]:newGroupMembers
                                        }
                                    }
                                }
                return newState
            }else{
                let find_member =_.find(group_member, (fv, fk)=>{
                                    return fk == action.member_key
                                })
                
                let newGroupMembers = {...group_member, [action.member_key]:action.member_data}
                if(!find_member){
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            group_members: {
                                                ...state.user.group_members,
                                                [action.group_id]:newGroupMembers
                                            }
                                        }
                                    }
                    return newState
                }else{
                    if(!_.isEqual(find_member, action.member_data)){
                        let newState = {...state,
                                            user: {
                                                ...state.user,
                                                group_members: {
                                                    ...state.user.group_members,
                                                    [action.group_id]:newGroupMembers
                                                }
                                            }
                                        }

                        return newState
                    } 
                }
            }
            return state
        }

        case MODIFIED_GROUP_MEMBER:{
            if(state.users === null){
                return state
            }
            
            let groups = state.users.groups

            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }

            console.log(group)
            console.log(action)
            if(group.members === undefined){
                let newGroup = {...group, 
                    members:{[action.member_key]:action.data}
                }
                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        groups : {
                            ...state.users.groups,
                            [action.group_id]: newGroup
                        }
                    }
                }
                console.log(v)
                return v
            }else{

                let oldMember = _.find(group.members,  function(v, k) { 
                    return k == action.member_key
                })

                if(!_.isEqual(oldMember, action.data)){
                    let newGroup = {...group, 
                                        members: {
                                            ...group.members,
                                            [action.member_key]:action.data
                                        }
                                    }

                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            groups : {
                                ...state.users.groups,
                                [action.group_id]: newGroup
                            }
                        }
                    }

                    console.log('Not equal')
                    console.log(v)
                    return v
                }else{
                    console.log('equal')
                }
            }
            
            return state
        }

        case REMOVED_GROUP_MEMBER:{
            if(state.users === null){
                return state
            }

            let groups = state.users.groups

            // let key = 0
            // let value = null
            // _.each(groups, function(_v, _k) { 
            //     if(_k === action.group_id){
            //         key = _k
            //         value = _v
            //     }
            // });

            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                return state
            }

            if(group.members !== undefined){
   
                let newMembers = _.omit(group.members, action.item_id)

                let newValue = {...group, 
                    members: newMembers
                }

                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        groups : {
                            ...state.users.groups,
                            [action.group_id]: newValue
                        }
                    }
                }
                return v
            }

            return state
        }

        /*
        case ADDED_GROUP_ADMIN:{
            if(state.users === null){
                return state
            }

            let groups = state.users.groups
            let group = _.find(groups,  function(v, k) { 
                return k == action.group_id
            })

            if(group === undefined){
                // console.log(value)
                return state
            }

            // dispatch({ type: ADDED_GROUP_ADMIN, group_id:change.doc.id, admin_item_id:admins_change.doc.id, admin_data: admins_change.doc.data()});

            if(group.group_admins === undefined){
                // console.log(group)
                let newGroup = {...group, 
                                    group_admins: {
                                        ...group.group_admins,
                                        [action.admin_item_id]:action.admin_data
                                    }
                                }
                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        groups : {
                            ...state.users.groups,
                            [action.group_id]: newGroup
                        }
                    }
                }
                return v
            }else{
                let group_admin = _.find(group.group_admins,  function(v, k) { 
                    return k == action.admin_item_id
                })

                if(!_.isEqual(group_admin, action.admin_data)){
                    console.log('Not equal')
                    let newGroup = {...group, 
                                        group_admins: {
                                            ...group.group_admins,
                                            [action.admin_item_id]:action.admin_data
                                        }
                                    }

                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            groups : {
                                ...state.users.groups,
                                [action.group_id]: newGroup
                            }
                        }
                    }
                    return v
                }else{
                    console.log('equal')
                }
            }
            return state
        }
        */

        case ADDED_CLASS:{
            if(state.user === null){
                return state
            }

            let classs = state.user.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        classs: {
                            ...state.user.classs,
                            [action.class_id]: action.class_data
                        }
                    }
                }
                console.log("Classs", 'Not equal', action, _class, v)
                return v
            }

            // console.log(classs)
            // console.log(action.class_id)
            // console.log(action.class_data)

            // dispatch({type: ADDED_CLASS, class_id:classsChange.doc.id ,class_data:classsChange.doc.data() })

            /* 
            การที่เราร่วมกันก่อน compare เพราะว่า data เก่าจะมี field members หรือ field อืนด้วย
            */
            let newClassData = action.class_data
            if(_class.members !== undefined){
                newClassData = {...action.class_data, members:_class.members}
            }

            // let newClassData = {..._class, ...action.class_data}
            // console.log("Classs", _class)
            // console.log("Classs", action.class_data)
            // console.log("Classs", newClassData)

            if(!_.isEqual(_class, newClassData)){
                // console.log()
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        classs : {
                            ...state.user.classs,
                            [action.class_id]: newClassData
                        }
                    }
                }
                console.log("Classs", 'Not equal', action, _class, v)
                return v
            }
            console.log("Classs", 'Equal', action, _class)

            return state
        }

        case MODIFIED_CLASS:{
            if(state.user === null){
                return state
            }

            let classs = state.user.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                return state
            }

            let newClassData = {..._class, ...action.class_data}

            // console.log("Classs", action)
            // console.log("Classs", _class)
            // console.log("Classs", action.class_data)
            // console.log("Classs", newClassData)

            if(_class.members === undefined){
                if(!_.isEqual(_class, action.class_data)){
                    let v = {
                        ...state,
                        user: {
                            ...state.user,
                            classs : {
                                ...state.user.classs,
                                [action.class_id]: action.class_data
                            }
                        }
                    }
                    console.log("Classs", v)
                }
            }else{
                let newClass = {...action.class_data, members:_class.members}
                console.log("Classs", newClass)

                if(!_.isEqual(_class, newClass)){
                    let v = {
                        ...state,
                        user: {
                            ...state.user,
                            classs : {
                                ...state.user.classs,
                                [action.class_id]: newClass
                            }
                        }
                    }
                    console.log("Classs", v)

                    return v
                }
            }

            return state
        }

        case REMOVED_CLASS:{
            if(state.user === null){
                return state
            }
            
            let classs = state.user.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                return state
            }

            let newClasss = _.omit(classs, action.class_id)
            let v = {
                ...state,
                user : {
                    ...state.user,
                    classs: newClasss
                }
            }
            console.log("Classs", v)
            return v
        }

        case ADDED_CLASS_MEMBER:{
            if(state.user === null){
                return state
            }

            let classs = state.user.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                return state
            }

            // console.log("Classs", _class)
            //  dispatch({type: ADDED_CLASS_MEMBER, class_id:classsChange.doc.id, class_member_id:classsMembersChange.doc.id, class_member_data:classsMembersChange.doc.data() })
            if(_class.members === undefined){

                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        classs : {
                            ...state.user.classs,
                            [action.class_id]: {..._class, members:{[action.class_member_id]: action.class_member_data}}
                        }
                    }
                }    
                console.log("ADDED_CLASS_MEMBER")
                return v
            }else{

                let members = _class.members
                let member = _.find(members,  function(v, k) { 
                    return k == action.class_member_id
                })

                // console.log(member, action)
                if(member === undefined){
                    let newMembers = {...members, [action.class_member_id ]:action.class_member_data}

                    let v = {
                        ...state,
                        user: {
                            ...state.user,
                            classs: {
                                ...state.user.classs,
                                [action.class_id]: {..._class, members:newMembers}
                            }
                        }
                    }       
                    // console.log("Classs", v)
                    console.log("ADDED_CLASS_MEMBER")
                    return v
                }else{
                    if(!_.isEqual(member, action.class_member_data)){
                        let newMembers = {...members, [action.class_member_id ]:action.class_member_data}

                        let v = {
                            ...state,
                            user: {
                                ...state.user,
                                classs: {
                                    ...state.user.classs,
                                    [action.class_id]: {..._class, members:newMembers}
                                }
                            }
                        }       
                        // console.log("Classs", v)
                        console.log("ADDED_CLASS_MEMBER")
                        return v
                    }
                }
            }
            return state
        }

        /* 
            - คิดเฉพาะ status == false เพือ update status = true เท่านั้น
        */
        case MODIFIED_CLASS_MEMBER:{

            if(state.users === null){
                return state
            }

            let classs = state.users.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class.members !== undefined){
                let members = _class.members
                let member = _.find(members,  function(v, k) { 
                    return k == action.class_member_id
                })

                console.log("Classs", member, action)
                if(member === undefined){
                    // members = {...members, ...{[action.class_member_id]: {...member, status:true}}}
                    let newMembers = {...members, [action.class_member_id ]:action.class_member_data}
                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            classs : {
                                ...state.users.classs,
                                [action.class_id]: {..._class, members:newMembers}
                            }
                        }
                    }  
                    console.log("Classs", v)
                    return v
                }else{
                    if(!_.isEqual(member, action.class_member_data)){
                        let newMembers = {...members, [action.class_member_id ]:action.class_member_data}

                        let v = {
                            ...state,
                            users : {
                                ...state.users,
                                classs : {
                                    ...state.users.classs,
                                    [action.class_id]: {..._class, members:newMembers}
                                }
                            }
                        }       
                        console.log("Classs", v)
                        return v
                    }
                }
            }

            return state
        }

        case REMOVED_CLASS_MEMBER:{
            if(state.users === null){
                return state
            }

            let classs = state.users.classs
            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                return state
            }

            if(_class.members !== undefined){
                let members = _class.members
                let member = _.find(members,  function(v, k) { 
                    return k == action.member_key // && !v.status
                })

                if(member !== undefined){
                    let newMembers = {...members, [action.member_key ]:{...member, status:false}}
                    
                    let v = {
                        ...state,
                        users : {
                            ...state.users,
                            classs : {
                                ...state.users.classs,
                                [action.class_id]: {..._class, members:newMembers}
                            }
                        }
                    }  
                    // console.log("Classs", v)
                    return v
                }
            }
            return state
        }

        case FAVORITES_CLASS :{
            if(state.user === null){
                return state
            }
            let classs = state.user.classs

            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                console.log('FAVORITES_CLASS : undefined', action.class_id)
                return state
            }

            if(_class.is_favorites === undefined){
                _class = {..._class, is_favorites:true}
                let v = {
                    ...state,
                    user : {
                        ...state.user,
                        classs : {
                            ...state.user.classs,
                            [action.class_id]: _class
                        }
                    }
                }
                console.log('FAVORITES_CLASS', v)
                return v 
            }else{
                if(action.favorite_status != _class.is_favorites){
                    _class = {..._class, is_favorites:action.favorite_status}
                    let v = {
                        ...state,
                        user : {
                            ...state.user,
                            classs : {
                                ...state.user.classs,
                                [action.class_id]: _class
                            }
                        }
                    }
                    console.log('FAVORITES_CLASS', v)
                    return v    
                }
            }

            return state
        }


        case UPDATE_CLASS_PICTURE_PROFILE:{

            if(state.user === null){
                return state
            }

            let classs = state.user.classs

            let _class = _.find(classs,  function(v, k) { 
                return k == action.class_id
            })

            if(_class === undefined){
                return state
            }

            // image_url

            if( !_.isEqual(action.image_url != _class.image_url) ){
                _class = {..._class, image_url:action.image_url}
                let v = {
                    ...state,
                    user : {
                        ...state.user,
                        classs : {
                            ...state.user.classs,
                            [action.class_id]: _class
                        }
                    }
                }
                console.log('CLASS update image_url : ', v)
                return v    
            }

            return state
        }
        
        case FRIEND_MUTE:{
            if(state.user === null){
                return state
            }

            let friends = state.user.friends

            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend !== undefined){
                if(friend.mute != action.mute){
                    friend = {...friend, mute:action.mute}

                    let newStatus = {...state,
                                        user : {
                                            ...state.user,
                                            friends : {
                                                ...state.user.friends,
                                                [action.friend_id]: friend
                                            }
                                        }
                                    }
                    return newStatus
                }
            }

            return state
        }

        case FRIEND_HIDE:{

            if(state.user === null){
                return state
            }

            let friends = state.user.friends

            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend !== undefined){
                if(friend.hide != action.hide){
                    friend = {...friend, hide:action.hide}
                    let newStatus = {...state,
                                        user : {
                                            ...state.user,
                                            friends : {
                                                ...state.user.friends,
                                                [action.friend_id]: friend
                                            }
                                        }
                                    }
                    return newStatus
                }
            }
            return state
        }

        case FRIEND_BLOCK:{

            if(state.user === null){
                return state
            }

            let friends = state.user.friends

            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend !== undefined){
                if(friend.block != action.block){
                    friend = {...friend, block:action.block}
                    let newStatus = {...state,
                                        user: {
                                            ...state.user,
                                            friends : {
                                                ...state.user.friends,
                                                [action.friend_id]: friend
                                            }
                                        }
                                    }
                    return newStatus
                }
            }
            return state
        }

        case FRIEND_FAVORITE:{
            if(state.user === null){
                return state
            }
            let friends = state.user.friends

            let friend = _.find(friends,  function(v, k) { 
                return k == action.friend_id
            })

            if(friend !== undefined){
                // friend_id, favorite_status
                console.log('FRIEND_FAVORITE', friend, action)
                if(friend.is_favorite != action.favorite_status){
                    friend = {...friend, is_favorite:action.favorite_status}
                    let newStatus = {...state,
                                        user: {
                                            ...state.user,
                                            friends: {
                                                ...state.user.friends,
                                                [action.friend_id]: friend
                                            }
                                        }
                                    }

                    console.log('FRIEND_FAVORITE', friend, newStatus, )
                    return newStatus
                }
            }
            return state
        }

        case ADDED_MY_APPLICATION:
        case MODIFIED_MY_APPLICATION:{
            if(state.user === null){
                return state
            }

            let my_applications = state.user.my_applications
            let my_application = _.find(my_applications,  function(v, k) { 
                return k == action.my_application_id
            })

            if(my_application === undefined){
                let v = {
                    ...state,
                    user: {
                        ...state.user,
                        my_applications: {
                            ...state.user.my_applications,
                            [action.my_application_id]:{...action.my_application_data}
                        }
                    }
                }
                return v;
            }else{
                /**
                 * เราจะ update กรณีข้อมูลเปลี่ยนแปลงเท่านั้น
                 *  */
                if(!isEquivalent2Object(my_application, action.my_application_data)){
                    let v = {
                        ...state,
                        user : {
                            ...state.user,
                            my_applications : {
                                ...state.user.my_applications,
                                [action.my_application_id]:action.my_application_data
                            }
                        }
                    }
                    return v;
                }
            }
            return state
        }

        case REMOVED_MY_APPLICATION:{

            // my_application_id:change.doc.id, my_application_data
            console.log('REMOVED_MY_APPLICATION')
            console.log(action.my_application_id)
            console.log(action.my_application_data)
            return state
        }

        case ADDED_MY_APPLICATIONS_POSTS:{
            if(state.user === null){
                return state
            }

            let my_applications_posts = state.user.my_applications_posts
            let my_applications_post =  _.find(my_applications_posts,  function(v, k) { 
                                            return k == action.app_id
                                        })

            // dispatch({type:ADDED_MY_APPLICATIONS_POSTS, app_id:doc_id, post_id:posts_doc_id, my_applications_posts_data:posts_doc_data})
            if(!my_applications_post){
                let newPost = {[action.post_id]:action.my_applications_posts_data}
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        my_applications_posts: {
                                            ...state.user.my_applications_posts,
                                            [action.app_id]:newPost
                                        }
                                    }
                                }

                return newState
            }else{
                let post =  _.find(my_applications_post, (v, k)=>{
                                return action.post_id == k
                            })
                
                if(!post){
                    let newPost = {...my_applications_post, [action.post_id]:action.my_applications_posts_data}
                
                    let newState = {...state,
                                        user: {
                                            ...state.user,
                                            my_applications_posts: {
                                                ...state.user.my_applications_posts,
                                                [action.app_id]:newPost
                                            }
                                        }
                                    }
                    console.log('ADDED_MY_APPLICATIONS_POSTS', newPost)
                    return newState
                }
            }
            return state
        }

        // my_applications_posts_images_data
        case ADDED_MY_APPLICATIONS_POSTS_IMAGES:{
            if(state.user === null){
                return state
            }

            let my_applications_posts_images= state.user.my_applications_posts_images
            let my_applications_posts_image = _.find(my_applications_posts_images,  function(v, k) { 
                                                return k == action.post_id
                                              })

            if(!my_applications_posts_image){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        my_applications_posts_images: {
                                            ...state.user.my_applications_posts_images,
                                            [action.post_id]:{[action.image_doc_id]:action.image_doc_data}
                                        }
                                    }
                                }
                return newState
            }else{
                let image = _.find(my_applications_posts_image, (v, k)=>{
                                return action.image_doc_id == k
                            })

                if(image){
                    
                    return state
                }

                let newImages   =   {...my_applications_posts_image, [action.image_doc_id]:action.image_doc_data }
                let newState    =   {...state,
                                        user: {
                                            ...state.user,
                                            my_applications_posts_images: {
                                                ...state.user.my_applications_posts_images,
                                                [action.post_id]:newImages
                                            }
                                        }
                                    }
                return newState
            }
            return state
        }

        case ADDED_MY_APPLICATIONS_POSTS_LIKES:{
            if(state.user === null){
                return state
            }

            // dispatch({type:ADDED_MY_APPLICATIONS_POSTS_LIKES, post_id:posts_doc_id, like_doc_id, like_doc_data})
            let my_applications_posts_likes = state.user.my_applications_posts_likes
            let my_applications_posts_like = _.find(my_applications_posts_likes,  function(v, k) { 
                                                return k == action.post_id
                                            })

            if(!my_applications_posts_like){
                let newState = {...state,
                                    user: {
                                        ...state.user,
                                        my_applications_posts_likes: {
                                            ...state.user.my_applications_posts_likes,
                                            [action.post_id]:{[action.like_doc_id]:action.like_doc_data}
                                        }
                                    }
                                }
                return newState
            }else{
                let like = _.find(my_applications_posts_like, (v, k)=>{
                                return action.like_doc_id == k
                            })

                if(like){
                    return state
                }

                let newLikes   =   {...my_applications_posts_like, [action.like_doc_id]:action.like_doc_data }
                let newState    =   {...state,
                                        user: {
                                            ...state.user,
                                            my_applications_posts_likes: {
                                                ...state.user.my_applications_posts_likes,
                                                [action.post_id]:newLikes
                                            }
                                        }
                                    }
                return newState
            }
            return state
        }

        case MODIFIED_MY_APPLICATIONS_POSTS_LIKES:{
            if(state.user === null){
                return state
            }
            let my_applications_posts_likes = state.user.my_applications_posts_likes
            let my_applications_posts_like = _.find(my_applications_posts_likes,  function(v, k) { 
                                                return k == action.post_id
                                            })
            if(my_applications_posts_like){
                let like = _.find(my_applications_posts_like, (v, k)=>{
                    return action.like_doc_id == k
                })

                if(like){
                    // console.log('MODIFIED_MY_APPLICATIONS_POSTS_LIKES', like, action.like_doc_data)
                    if(!_.isEqual(like, action.like_doc_data)){
                        let update_likes=   {...my_applications_posts_like, [action.like_doc_id]:action.like_doc_data }
                        let newState    =   {...state,
                                                user: {
                                                    ...state.user,
                                                    my_applications_posts_likes: {
                                                        ...state.user.my_applications_posts_likes,
                                                        [action.post_id]:update_likes
                                                    }
                                                }
                                            }

                        // console.log('MODIFIED_MY_APPLICATIONS_POSTS_LIKES', newState)
                        return newState
                    }
                }
            }

            return state
        }

        case REMOVED_MY_APPLICATIONS_POSTS_LIKES:{
            if(state.user === null){
                return state
            }

            let my_applications_posts_likes = state.user.my_applications_posts_likes
            let my_applications_posts_like  = _.find(my_applications_posts_likes,  function(v, k) { 
                                                return k == action.post_id
                                              })
            if(my_applications_posts_like){
                let like = _.find(my_applications_posts_like, (v, k)=>{
                    return action.like_doc_id == k
                })

                if(like){
                    let update_likes= _.omit(my_applications_posts_like, action.like_doc_id)
                    let newState    =   {...state,
                                            user: {
                                                ...state.user,
                                                my_applications_posts_likes: {
                                                    ...state.user.my_applications_posts_likes,
                                                    [action.post_id]:update_likes
                                                }
                                            }
                                        }

                    // console.log('REMOVED_MY_APPLICATIONS_POSTS_LIKES', newState)
                    return newState
                }
            }

            return state
        }

        case UPDATE_STATUS_MY_APPLICATION:{
            if(state.users === null){
                return state
            }

            let my_applications = state.users.my_applications
            let my_application = _.find(my_applications,  function(v, k) { 
                return k == action.my_application_id
            })

            if(my_application !== undefined){
                let newMy_application = {...my_application, status:action.my_application_status}

                let v = {
                    ...state,
                    users : {
                        ...state.users,
                        my_applications : {
                            ...state.users.my_applications,
                            [action.my_application_id]: newMy_application
                        }
                    }
                }
                return v
            }
            return state
        }

        case ADD_APPLICATION_CATEGORY:{
            // application_category
            let v = {
                ...state,
                application_category: action.data_category
            }
            return v
        }


        // dispatch({ type: ADDED_FEELINGS_AND_PRIVACY, post_feelings: data.data.post_feelings, post_privacys: data.data.post_privacys});
        case ADDED_FEELINGS_AND_PRIVACY:{
            // application_category
            let v = {
                ...state, ...{post_feelings: action.post_feelings, post_privacys:action.post_privacys}
            }
            return v
        }

        default:
            return state
    }
}