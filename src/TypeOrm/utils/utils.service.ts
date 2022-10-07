import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UtilsService {
  @InjectKnex() private readonly knex: Knex;

  //checkout
  async checkout(data: any) {
    if (Array.isArray(data)) {
      const rosterTrack = {
        eid: data[0].eid,
        on_duty: data[0].on_duty,
      };

      const rosterDetails = {
        eid: data[0].eid,
        on_duty: data[0].on_duty,
      };

      await this.knex('tbl_employee_roster')
        .where({ eid: rosterDetails.eid })
        .update({ ...rosterDetails });

      await this.knex('tbl_employee_roster_track')
        .where({ eid: rosterTrack.eid })
        .update({ ...rosterTrack });
    } else {
      const rosterDetails = {
        eid: data.eid,
        on_duty: data.on_duty,
      };

      const rosterTrack = {
        eid: data.eid,
        on_duty: data.on_duty,
      };

      await this.knex('tbl_employee_roster_track')
        .where({ eid: rosterTrack.eid })
        .update({ ...rosterTrack });

      await this.knex('tbl_employee_roster')
        .where({ eid: rosterDetails.eid })
        .update({ ...rosterDetails });
    }
  }

  //logout
  async signout(data: any) {
    if (Array.isArray(data)) {
      const logout = {
        riderid: data[0].eid,
        session_id: data[0].session_id,
        modified: data[0].modified,
      };
      console.log('?????????????', data);
      await this.knex('tbl_rider_interview_tracker')
        .insert({ ...logout })
        .onConflict('riderid')
        .merge();
      // await this.knex('tbl_rider_interview_tracker')
      //   .where({ riderid: logout.riderid })
      //   .update({
      //     ...logout,
      //   });
    } else {
      const logout = {
        riderid: data.eid,
        session_id: data.session_id,
        modified: data.modified,
      };
      console.log('?===?????', data);
      // await this.knex('tbl_rider_interview_tracker')
      //   .where({ riderid: logout.riderid })
      //   .update({
      //     ...logout,
      //   });

      await this.knex('tbl_rider_interview_tracker')
        .insert({ ...logout })
        .onConflict('riderid')
        .merge();
    }
  }

  //login
  async login(data: any) {
    if (Array.isArray(data)) {
      const eBasicDetail = {
        eid: data[0].eid,
        app_origin: data[0].app_origin,
      };

      const tpRiderAppUserDetails = {
        eid: data[0].eid,
        app_uname: data[0].app_uname,
        app_device_imei: data[0].device_imei,
        app_origin: data[0].app_origin,
        app_user_created_time: data[0].app_user_created_time,
        app_user_modified_time: data[0].app_user_modified_time,
        app_user_created_ip: data[0].app_user_created_ip,
        active: data[0].active,
        tp_eid: data[0].tp_eid,
      };
      const interviewTracker = {
        riderid: data[0].eid,
        device_imei: data[0].device_imei,
        session_id: data[0].session_id,
        session_created_time: data[0].session_created_time,
      };

      const deviceDetails = {
        eid: data[0].eid,
        app_uname: data[0].app_uname,
        device_imei: data[0].device_imei,
        device_token: data[0].device_token,
        app_version: data[0].app_version,
        device_manufacturer: data[0].device_manufacturer,
        device_model: data[0].device_model,
        device_product: data[0].device_product,
        device_software_version: data[0].device_software_version,
      };

      await this.knex('tbl_employee_basic_details')
        .where({ eid: eBasicDetail.eid })
        .update({
          ...eBasicDetail,
        });

      await this.knex('tbl_rider_interview_tracker')
        .where({ riderid: interviewTracker.riderid })
        .update({
          ...interviewTracker,
        });

      await this.knex('tbl_employee_device_details')
        .where({ eid: deviceDetails.eid })
        .update({
          ...deviceDetails,
        });
      await this.knex('tbl_tp_rider_app_user_details')
        .where({ eid: tpRiderAppUserDetails.eid })
        .update({ ...tpRiderAppUserDetails });
    } else {
    

      const eBasicDetail = {
        eid: data.eid,
        app_origin: data.app_origin,
      };

      const tpRiderAppUserDetails = {
        eid: data.eid,
        app_uname: data.app_uname,
        app_device_imei: data.device_imei,
        app_origin: data.app_origin,
        app_user_created_time: data.app_user_created_time,
        app_user_modified_time: data.app_user_modified_time,
        app_user_created_ip: data.app_user_created_ip,
        active: data.active,
        tp_eid: data.tp_eid,
      };
      const interviewTracker = {
        riderid: data.eid,
        device_imei: data.device_imei,

        session_id: data.session_id,
        session_created_time: data.session_created_time,
      };

      const deviceDetails = {
        eid: data.eid,
        app_uname: data.app_uname,
        device_imei: data.device_imei,
        device_token: data.device_token,
        app_version: data.app_version,
        device_manufacturer: data.device_manufacturer,
        device_model: data.device_model,
        device_product: data.device_product,
        device_software_version: data.device_software_version,
      };

      await this.knex('tbl_rider_interview_tracker')
        .where({ riderid: interviewTracker.riderid })
        .update({
          ...interviewTracker,
        });

      await this.basicDetails(eBasicDetail);
      await this.knex('tbl_employee_device_details')
        .where({ eid: deviceDetails.eid })
        .update({
          ...deviceDetails,
        });

      await this.knex('tbl_tp_rider_app_user_details')
        .where({ eid: tpRiderAppUserDetails.eid })
        .update({ ...tpRiderAppUserDetails });
    }
  }

  //checkin
  async checkin(data: any) {
    if (Array.isArray(data)) {
      const rosterDetails = {
        eid: data[0].eid,
        city_id: data[0].city_id,
        hotspot_id: data[0].hotspot_id,
        on_duty: data[0].on_duty,
        first_checkin: data[0].first_checkin,
        last_checkin_time: data[0].last_checkin_time,
        created: data[0].created,
        attendance_type: data[0].attendance_type,
      };

      const eBasicDetail = {
        eid: data[0].eid,
        rider_status: data[0].rider_status,
      };

      const interviewTracker = {
        riderid: data[0].eid,
        selected_status: data[0].selected_status,
      };
      const rosterTrack = {
        eid: data[0].eid,
        city_id: data[0].city_id,
        hotspot_id: data[0].hotspot_id,
        attendance_type: data[0].attendance_type,
        on_duty: data[0].on_duty,
        created: data[0].created,
      };

      await this.knex('tbl_employee_roster_track')
        .where({ eid: rosterTrack.eid })
        .update({ ...rosterTrack });

      await this.basicDetails(eBasicDetail);
      await this.interviewDetails(interviewTracker);
      await this.rosterDetails(rosterDetails);
    } else {
      const rosterDetails = {
        eid: data.eid,
        city_id: data.city_id,
        hotspot_id: data.hotspot_id,
        on_duty: data.on_duty,
        first_checkin: data.first_checkin,
        last_checkin_time: data.last_checkin_time,
        created: data.created,
        attendance_type: data.attendance_type,
      };

      const eBasicDetail = {
        eid: data.eid,
        rider_status: data.rider_status,
      };

      const interviewTracker = {
        riderid: data.eid,
        selected_status: data.selected_status,
      };
      const rosterTrack = {
        eid: data.eid,
        city_id: data.city_id,
        hotspot_id: data.hotspot_id,
        attendance_type: data.attendance_type,
        on_duty: data.on_duty,
        created: data.created,
      };
      await this.knex('tbl_employee_roster_track')
        .where({ eid: rosterTrack.eid })
        .update({ ...rosterTrack });

      await this.basicDetails(eBasicDetail);
      await this.interviewDetails(interviewTracker);
      await this.rosterDetails(rosterDetails);
    }
  }

  //common functions
  async rosterDetails(data: any) {
    await this.knex('tbl_employee_roster')
      .where({ eid: data.eid })
      .update({
        ...data,
      });
  }

  async basicDetails(data: any) {
    await this.knex('tbl_employee_basic_details')
      .where({ eid: data.eid })
      .update({
        ...data,
      });
  }

  async interviewDetails(data: any) {
    await this.knex('tbl_rider_interview_tracker')
      .where({ riderid: data.riderid })
      .update({
        ...data,
      });
  }
}
