<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Tests\Integration\Preview\Bulkexports;

use Twilio\Exceptions\DeserializeException;
use Twilio\Exceptions\TwilioException;
use Twilio\Http\Response;
use Twilio\Tests\HolodeckTestCase;
use Twilio\Tests\Request;

class ExportConfigurationTest extends HolodeckTestCase {
    public function testFetchRequest() {
        $this->holodeck->mock(new Response(500, ''));

        try {
            $this->twilio->preview->bulkExports->exportConfiguration("resourceType")->fetch();
        } catch (DeserializeException $e) {}
          catch (TwilioException $e) {}

        $this->assertRequest(new Request(
            'get',
            'https://preview.twilio.com/BulkExports/Exports/resourceType/Configuration'
        ));
    }

    public function testFetchResponse() {
        $this->holodeck->mock(new Response(
            200,
            '
            {
                "url": "https://preview.twilio.com/BulkExports/Exports/Calls/Configuration",
                "enabled": true,
                "webhook_url": "",
                "webhook_method": "",
                "resource_type": "Calls"
            }
            '
        ));

        $actual = $this->twilio->preview->bulkExports->exportConfiguration("resourceType")->fetch();

        $this->assertNotNull($actual);
    }

    public function testUpdateRequest() {
        $this->holodeck->mock(new Response(500, ''));

        try {
            $this->twilio->preview->bulkExports->exportConfiguration("resourceType")->update();
        } catch (DeserializeException $e) {}
          catch (TwilioException $e) {}

        $this->assertRequest(new Request(
            'post',
            'https://preview.twilio.com/BulkExports/Exports/resourceType/Configuration'
        ));
    }

    public function testUpdateResponse() {
        $this->holodeck->mock(new Response(
            200,
            '
            {
                "url": "https://preview.twilio.com/BulkExports/Exports/Calls/Configuration",
                "enabled": true,
                "webhook_url": "",
                "resource_type": "Calls",
                "webhook_method": ""
            }
            '
        ));

        $actual = $this->twilio->preview->bulkExports->exportConfiguration("resourceType")->update();

        $this->assertNotNull($actual);
    }
}