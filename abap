   IF lt_return IS NOT INITIAL .
      DATA lo_message_container TYPE REF TO /iwbep/if_message_container.
      CALL METHOD me->/iwbep/if_mgw_conv_srv_runtime~get_message_container
        RECEIVING
          ro_message_container = lo_message_container.
      CALL METHOD lo_message_container->add_messages_from_bapi
        EXPORTING
          it_bapi_messages          = lt_return
          iv_add_to_response_header = abap_true.
    ENDIF.
