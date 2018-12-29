<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\Notify\V1\Service\User;

use Twilio\Page;

/**
 * PLEASE NOTE that this class contains beta products that are subject to change. Use them with caution.
 */
class UserBindingPage extends Page {
    public function __construct($version, $response, $solution) {
        parent::__construct($version, $response);

        // Path Solution
        $this->solution = $solution;
    }

    public function buildInstance(array $payload) {
        return new UserBindingInstance(
            $this->version,
            $payload,
            $this->solution['serviceSid'],
            $this->solution['identity']
        );
    }

    /**
     * Provide a friendly representation
     * 
     * @return string Machine friendly representation
     */
    public function __toString() {
        return '[Twilio.Notify.V1.UserBindingPage]';
    }
}